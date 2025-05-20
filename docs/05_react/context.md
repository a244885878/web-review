```tsx
import { createContext, useContext } from "react";
import useSuperState from "@/hooks/useSuperState";

/*
  当读取上下文的组件上方的树中没有匹配的上下文时，希望该上下文具有的默认值。
  倘若没有任何有意义的默认值，可指定其为 null。该默认值是用于作为“最后的手段”的后备方案。
  它是静态的，永远不会随时间改变。
*/
const MyContent = createContext("light");

function Child() {
  const inject = useContext(MyContent);

  return <h2>Child {inject}</h2>;
}

function Parent() {
  const inject = useContext(MyContent);

  const level = 3;
  const Tag = `<h${level}>h3</h${level}>`;

  return (
    <>
      <h1>Parent {inject}</h1>
      <Child></Child>
      <div dangerouslySetInnerHTML={{ __html: Tag }}></div>
    </>
  );
}

export default function Inject() {
  const [value, setValue] = useSuperState<string>("dark");

  return (
    <MyContent.Provider value={value}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Parent></Parent>
    </MyContent.Provider>
  );
}
```
