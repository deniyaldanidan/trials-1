import MyForm from "./components/MyForm";

import MyDetails from "./components/MyDetails"

// import Paragraph from "./components/Paragraph"

// import Notification from "./components/Notification";
// import Peoples from "./components/Peoples";
// import Words from "./components/Words";



function App() {

  return (
    <div className="w-fit mt-[30px] mx-auto" >
      {/* <Notification /> */}
      {/* <Peoples /> */}
      {/* <Words /> */}
      <MyForm />
      {/* <Paragraph /> */}
      <MyDetails question="How's the day?" answer="Today is so good." className="mt-[30px]" />
    </div>
  )
}

export default App
