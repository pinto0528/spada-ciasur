import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
  } from "@/components/ui/accordion"

  import '../../styles/landing.css'
import { Heading } from "@chakra-ui/react"
  
  const FAQ = () => {
    return (
      <section className="section">
      <Heading style={{marginBottom: '20px'}}>FAQs</Heading>
      <AccordionRoot collapsible style={{marginBottom: '2vh'}}>
        {items.map((item, index) => (
          <AccordionItem key={index} value={item.value}>
            <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
            <AccordionItemContent>{item.text}</AccordionItemContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
      </section>
    )
  }
  
  const items = [
    { value: "a", title: "First Item", text: "Some value 1..." },
    { value: "b", title: "Second Item", text: "Some value 2..." },
    { value: "c", title: "Third Item", text: "Some value 3..." },
  ]
  
  export default FAQ;