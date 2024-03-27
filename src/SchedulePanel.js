import { useState } from "react";
import CurrentDayBar from "./CurrentDayBar";
import { useSwipeable } from "react-swipeable"; // Importing useSwipeable hook"


function SchedulePanel() {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log("Swiped Left");
      setBackgroundColor("bg-red-500");},
    onSwipedRight: () => {
       console.log("Swiped Right")
       setBackgroundColor("bg-blue-500");}
       ,
    // Include any additional configuration for swipeable behavior here
  });

  // State to track the background color
  const [backgroundColor, setBackgroundColor] = useState("bg-black");

  return (
    <div className="w-full h-full my-4 bg-neutral-100 rounded-3xl shadow-2xl overflow-hidden">
      
      <CurrentDayBar />


 

        <div className={`flex mx-2 h-full ${backgroundColor} overflow-hidden overflow-y-auto`}  style={{ height: '82.5%' }} {...handlers}>

          <div class="flex-none mx-2 h-full  bg-blue-400 w-2"> </div>

          <div className="flex-col w-full">
            <Event />
            <Event />
            <Event />
            <Event />
            <Event />
            <Event/>
            <Event/>
            <Event/>
            <Event/>

          </div>  

        </div>

     </div>

  );
}
function Event()
{

    return(
      <div className="h-44 w-11/12 bg-red-500 m-2"></div>
    );


}
export default SchedulePanel;
