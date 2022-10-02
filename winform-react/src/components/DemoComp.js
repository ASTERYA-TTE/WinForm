import React, {useState} from 'react'


const DemoComp = (props) => {

    const [demoStr,setDemoStr] = useState(null)

    return (
        <h1>Merhaba Demo Component {demoStr}</h1>
    )
}


export default DemoComp;