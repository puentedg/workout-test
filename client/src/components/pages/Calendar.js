import React from 'react';
import mobiscroll from '@mobiscroll/react-lite';
import { Eventcalendar, getJson, toast } from '@mobiscroll/react';

// class Calendar extends React.Component {
//     render() {
//         return (
//             <mobiscroll.Form theme="mobiscroll">
//                 <mobiscroll.Input name="username">Username</mobiscroll.Input>
//                 <mobiscroll.Input name="password" type="password">Password</mobiscroll.Input>
//                 <mobiscroll.Button type="submit">Sign In</mobiscroll.Button>
//             </mobiscroll.Form>
//         );
//     }    
// }


// ;

function Calendar () {

    const [myEvents, setEvents] = React.useState([]);

    React.useEffect(() => {
        getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
            setEvents(events);
        }, 'jsonp');
    }, []);
    
    const onEventClick = React.useCallback((event) => {
        toast({
            message: event.event.title
        });
    }, []);
    
    const view = React.useMemo(() => {
        return {
            calendar: { popover: true, count: true }
        };
    }, []);

    return (
        <Eventcalendar
            theme="ios" 
            themeVariant="light"
            clickToCreate={false}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            eventDelete={false}
            data={myEvents}
            view={view}
            onEventClick={onEventClick}
       />
    ); 
}

export default Calendar