1.v-for 为什么要使用key
Virtual DOM 使用Diff算法实现的原因。
因为有key的时候，即使dom顺序全部打乱，diff算法也能根据key判断是否是相同的vnode，然后进行复用。
key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。
key 为index时起不到这个作用

2.虚拟dom diff算法