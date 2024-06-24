n, k = map(int, input().split())
W = [int(x) for x in input().split()]
V = [int(x) for x in input().split()]

left, right = 0, 5001
for _ in range(100):
    mid = (left + right) / 2

    tmp = [0] * n
    for i in range(n):
        tmp[i] = V[i] - W[i] * mid
    tmp.sort(reverse=True)

    if sum(tmp[:k]) >= 0:
        left = mid
    else:
        right = mid

print(left)