import { useState } from "react"

export function useScroll (contentWrapper){
    
    // ------------ Slider States ----------------
    const [counter,setCounter] = useState(0)
    
    // ------------ Get The Width For Each Element ----------------
    const lastElement = contentWrapper?.current?.children[contentWrapper?.current?.children?.length - 1]
    const elementWidth = lastElement?.getBoundingClientRect()?.width
    const rightOfLastElement = lastElement?.getBoundingClientRect()?.right 
    const rightOfSliderCotainer = contentWrapper?.current?.parentElement?.getBoundingClientRect()?.right

    //  If Element Width > 300px 
    // --> The Slider Display One Element Per Slide ----------------
    const isSingleElementSlider = elementWidth > 300 ? true : false    

    // ------------ Next Button Disable Condition ----------------
    const nextButtonDisabled = isSingleElementSlider ? 
        counter === contentWrapper?.current?.children?.length -1 :
        rightOfLastElement < rightOfSliderCotainer + 100 && counter !== 0
        
    
    // ------------ Define Translate Value ----------------
    const translate = isSingleElementSlider ? `${-counter * 100}vw` : `${-counter * 30}vw`

    //---   Handle Scroll Function  ----------------------------------------------------
    const handleScroll = (dir) => {
        if(dir === 'right'){
            setCounter(p => p + 1)
        } else {
            setCounter(p => p - 1)
        }
    }

    return { handleScroll, counter, translate, nextButtonDisabled }
}

export default useScroll