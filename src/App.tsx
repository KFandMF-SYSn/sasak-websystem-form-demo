import { useState } from 'react'
import './App.css'

const formDataInitializer = JSON.stringify([
  {
    "type": "heading",
    "level": 1,
    "content": "ウェブ原稿申請フォーム"
  },
  {
    "type": "form",
    "content": [
      {
        "type": "text",
        "content": "団体のタイトルは？"
      },
      {
        "type": "input",
        "kind": "text",
      }
    ]
  }
])

function Heading(props: {
  data: any
}) {
  const d = props.data
  if (!d.level && d.content) return <p>未対応</p>

  switch (d.level) {
    case 1:
      return <h1>{d.content}</h1>
    case 2:
      return <h2>{d.content}</h2>
    default:
      return <div>未対応</div>
  }
}

function FormBuilder(props: {
  data: any
}) {
  const d = props.data
  if (d.type === "heading") {
    return <Heading data={d} />
  }
  else if (d.type === "form") {
    return (<div style={{ border: "1px solid black", padding: "5px" }}>
      {
        d.content.map((c: any, i: number) => {
          return <FormBuilder data={c} key={i}></FormBuilder>
        })
      }
    </div>)
  }
  else if (d.type === "text") {
    return <p>{d.content}</p>
  }
  else if (d.type === "input") {
    return <input type={d.kind}></input>
  }
  return (
    <div>未対応</div>
  )
}


function App() {
  const [formDataJson, setFormDataJson] = useState(formDataInitializer)
  let formData: any = []
  let message = <></>
  try {
    formData = JSON.parse(formDataJson)
  } catch (e) {
    message = <p>無効な JSON です</p>
  }

  return (
    <div className='App'>
      <textarea onChange={e => setFormDataJson(e.target.value)}>{formDataJson}</textarea>
      {
        formData.map((d: any, i: number) => {
          return <FormBuilder data={d} key={i} />
        })
      }
      {message}
    </div>
  );
}

export default App
