import React from 'react';

function Header() {
    return (
        <nav className="container h-auto py-2">

            <div className="flex justify-between">
                <div className="flex-none w-1/4 text-slate-500 text-left text-sm">
                    <strong>ScheduleSync</strong>
                </div>

                <div className="flex-grow text-slate-500 text-center">
                    jmeefwefewh
                </div>

      
                    <svg className="flex-none flex justify-end" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                    </svg>
               </div>

        </nav>
    );
}

export default Header;