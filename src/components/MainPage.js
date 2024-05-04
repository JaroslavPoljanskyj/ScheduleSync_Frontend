import Header from './Header';
import NavigationBar from './NavigationBar';
import SchedulePanel from './SchedulePanel';
import ScheduleDataProvider from './scheduleDataProvider';

function MainPage() {
    return (
 
     <div className="container h-full w-full flex flex-col bg-violet-100 px-4">
            <ScheduleDataProvider>
                <Header />
                <SchedulePanel/>
                <NavigationBar />
            </ScheduleDataProvider>
    </div>




    );
}

export default MainPage;