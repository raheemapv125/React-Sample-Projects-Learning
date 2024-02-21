import { EXAMPLES } from "../data.jsx"
import TabButton from "./TabButton.jsx"
import Section from "./Section.jsx"
import Tabs from "./Tabs.jsx"
import { useState } from 'react'


export default function Examples() {
    let [selectedTopic , setSelectedTopic] = useState()

    function clickHandler (selectedButton) {
            setSelectedTopic(selectedButton)
    }

    let tabContent = <p>Please Select a Topic. </p>
    if(selectedTopic){
        tabContent =  (
        <div id = "tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
        <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
        </div>
        )
    }

    return (
        <Section title = "Examples" id = "examples">
            <Tabs buttons = {<>
                <TabButton isSelected={selectedTopic === 'components'}
                onClick = {() => clickHandler('components')} >
                    Components</TabButton>
                <TabButton  isSelected={selectedTopic === 'jsx'}
                onClick = {() => clickHandler('jsx')}>
                    JSX</TabButton>
                <TabButton  isSelected={selectedTopic === 'props'}
                onClick = {() => clickHandler('props')}>
                    Props</TabButton>
                <TabButton  isSelected={selectedTopic === 'state'}
                onClick = {() => clickHandler('state')}>
                    State</TabButton>
                </>}>
            {tabContent}
            </Tabs>
        </Section>
    )
}