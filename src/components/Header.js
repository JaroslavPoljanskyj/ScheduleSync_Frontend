import React, { useContext, useState, useEffect} from "react";
import { ScheduleDataContext } from "./ScheduleDataContext";

function Header() {

    const { handlerMap } = useContext(ScheduleDataContext);
    const [activeScheduleName, setActiveScheduleName] = useState("");
    useEffect(() => {
        // Fetch the active schedule name when the component mounts
        handlerMap.getActiveSchedule()
            .then(activeSchedule => {
                setActiveScheduleName(activeSchedule.name);
            })
            .catch(error => {
                console.error("Error loading active schedule name:", error);
            });
    }, [handlerMap]);
    return (
        <nav className="container h-auto pt-1">

            <div className="flex justify-between">
                

                <div className="flex-grow text-slate-500 text-2xl text-center">
                     {activeScheduleName}

                </div>

                {/* <div className="flex-none w-1/4 text-slate-500 text-left text-sm">
                    <strong>ScheduleSync</strong>
                </div> */}

               </div>

        </nav>
    );
}

export default Header;