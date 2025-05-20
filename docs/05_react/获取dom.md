```tsx
export default function Ref() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      console.log(divRef.current);
    }
  }, []);

  return (
    <div ref={divRef}>
      <span>你好</span>
    </div>
  );
}
```

通过 `useRef` 获取 dom 示例,类似 vue3，需要 `.current`
