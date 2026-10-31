"""Green-screen compositor: replace only the green screen with a screenshot.
comp(mockup, shot, out, scale=2): quad from fitted screen edges, perspective warp
(downscale-only, INTER_AREA pre-resize + light unsharp), masked to green pixels,
despill on the edge, keeps the screen's own shading as subtle gloss."""
import cv2, numpy as np, sys
def green_mask(im):
    b,g,r=[im[...,i].astype(np.int16) for i in range(3)]
    return ((g-np.maximum(r,b))>40)&(g>90)
def quad(mask):
    m=mask.astype(np.uint8)*255
    n,lab,st,_=cv2.connectedComponentsWithStats(m); k=1+np.argmax(st[1:,4]); m=(lab==k).astype(np.uint8)*255
    m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((9,9),np.uint8))
    cs,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE); c=max(cs,key=cv2.contourArea)
    hull=cv2.convexHull(c); per=cv2.arcLength(hull,True)
    for e in np.linspace(.01,.1,60):
        ap=cv2.approxPolyDP(hull,e*per,True)
        if len(ap)==4: break
    ap=ap.reshape(4,2).astype(np.float64); pts=c.reshape(-1,2).astype(np.float64)
    lines=[]
    for i in range(4):
        a,b=ap[i],ap[(i+1)%4]; d=b-a; L=np.linalg.norm(d); u=d/L; nrm=np.array([-u[1],u[0]])
        t=(pts-a)@u; dist=np.abs((pts-a)@nrm)
        sel=pts[(t>.15*L)&(t<.85*L)&(dist<6)]
        if len(sel)<10: sel=np.array([a,b])
        vx,vy,x0,y0=cv2.fitLine(sel.astype(np.float32),cv2.DIST_HUBER,0,.01,.01).ravel(); lines.append((np.array([x0,y0]),np.array([vx,vy])))
    q=[]
    for i in range(4):
        (p1,d1),(p2,d2)=lines[i-1],lines[i]
        A=np.array([d1,-d2]).T; s=np.linalg.solve(A,p2-p1); q.append(p1+s[0]*d1)
    q=np.array(q)
    # order TL,TR,BR,BL
    c0=q.mean(0); ang=np.arctan2(q[:,1]-c0[1],q[:,0]-c0[0]); q=q[np.argsort(ang)]  # starts ~ -pi (left)
    # rotate so first = smallest x+y
    i0=np.argmin(q.sum(1)); q=np.roll(q,-i0,0)
    return q.astype(np.float32), m
def comp(mock, shot, out, scale=2, gloss=.10, orient=None, q=None):
    M=cv2.imread(mock); S=cv2.imread(shot)
    if scale!=1: M=cv2.resize(M,None,fx=scale,fy=scale,interpolation=cv2.INTER_LANCZOS4)
    gm=green_mask(M)
    q=quad(gm)[0] if q is None else (np.float32(q)*scale)
    if orient is not None: q=np.roll(q,orient,0)
    w=int(max(np.linalg.norm(q[1]-q[0]),np.linalg.norm(q[2]-q[3]))); h=int(max(np.linalg.norm(q[3]-q[0]),np.linalg.norm(q[2]-q[1])))
    sh,sw=S.shape[:2]; f=min(1,max(w/sw,h/sh)*1.0)
    if f<1: S=cv2.resize(S,(int(sw*f),int(sh*f)),interpolation=cv2.INTER_AREA); 
    bl=cv2.GaussianBlur(S,(0,0),.8); S=cv2.addWeighted(S,1.35,bl,-.35,0)
    sh,sw=S.shape[:2]
    H=cv2.getPerspectiveTransform(np.float32([[0,0],[sw,0],[sw,sh],[0,sh]]),q)
    W=cv2.warpPerspective(S,H,(M.shape[1],M.shape[0]),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_REPLICATE)
    # mask: green pixels, closed, slightly grown to eat fringe, feathered
    m=gm.astype(np.uint8)*255; m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8)); m=cv2.dilate(m,np.ones((3,3),np.uint8))
    a=cv2.GaussianBlur(m.astype(np.float32)/255,(0,0),.7)[...,None]
    # shading from green channel inside screen -> subtle gloss/vignette
    g=M[...,1].astype(np.float32); ref=np.percentile(g[gm],90); shade=np.clip(g/ref,0.6,1.15)[...,None]
    Wf=W.astype(np.float32)*(1-gloss+gloss*shade)
    o=M.astype(np.float32)*(1-a)+Wf*a
    # despill ring around screen
    ring=(cv2.dilate(m,np.ones((7,7),np.uint8))>0)&(a[...,0]<.98)
    o2=o.copy(); mx=np.maximum(o[...,0],o[...,2]); o2[...,1]=np.where(ring,np.minimum(o[...,1],mx*1.02),o[...,1])
    cv2.imwrite(out,np.clip(o2,0,255).astype(np.uint8),[cv2.IMWRITE_PNG_COMPRESSION,6])
    return q,(w,h)
if __name__=='__main__':
    print(comp(sys.argv[1],sys.argv[2],sys.argv[3],float(sys.argv[4]) if len(sys.argv)>4 else 2))
