import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Textarea } from './ui/textarea'

type props={
    values :{
        dateTime : Date
        description: string
        link:string
    },
    setvalues :React.Dispatch<React.SetStateAction<{ dateTime: Date; description: string , link: string; }>>
}

const MeetingSchedule = ({values , setvalues} : props) => {
  return (
    <div>
                <div className="flex flex-col gap-2.5">

                        <label className="text-base font-normal leading-[22.4px] text-sky-2">
                        Add a description
                        </label>

                        <Textarea 
                        
                        className="border-none bg-dark-3  text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                        onChange={(e) => setvalues({ ...values, description: e.target.value })}
                        />
                </div>

                <div className="flex w-full flex-col gap-2.5">

                            <label className="text-base font-normal leading-[22.4px] text-sky-2">
                                Select Date and Time
                            </label>

                            <ReactDatePicker
                                selected={values.dateTime}
                                onChange={(date) => setvalues({ ...values, dateTime: date! })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="w-full rounded bg-dark-3 p-2 focus:outline-none text-black"
                            />
               </div>
    </div>
  )
}

export default MeetingSchedule