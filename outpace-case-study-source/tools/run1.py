import sys; sys.path.insert(0,'/home/claude/outpace/mk'); from comp import comp
G='/home/claude/outpace/gs/'; C='/home/claude/outpace/cap/'; O='/home/claude/outpace/out/'
import os; os.makedirs(O,exist_ok=True)
jobs=[('cover','home',dict(q=[[510,311],[1167,468],[1011,923],[374,771]])),
      ('G13','home',dict(q=[[298,601],[942,503],[963,930],[300,1025]])),
      ('G03','cricket',{}),('G06','cmp',{}),('G04','cricket',{}),('G12','kit',{})]
for g,s,kw in jobs:
    print(g,comp(G+g+'.png',C+s+'.png',O+f'{g}-{s}.png',**kw)[1])
