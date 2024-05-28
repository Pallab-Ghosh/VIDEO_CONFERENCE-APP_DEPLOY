import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "@/components/ui/carousel"
import { image_slider_datas } from "@/constants"
import Image from "next/image"

export function ImageSlider() {
  return (
    <Carousel className="sm:w-[500px] w-full flex justify-center max-w-xs sm:max-w-lg ">
            <CarouselContent>
                {
                    image_slider_datas.map((data , index) => (
                        <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card className="bg-dark-2 border-dark-2">
                                        <CardContent className="flex aspect-square items-center justify-center">
                                          {
                                             <div className=" flex flex-col items-center p-4 ">
                                                 <Image src={data.img_src} height={348} width={348} alt="img"/>
                                                  <h2 className=" text-white mt-8 mb-4 text-2xl">{data.label}</h2>
                                                  <p className=" text-white text-center">{data.description}</p>
                                             </div>
                                          }
                                        </CardContent>
                                    </Card>
                                </div>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
           <CarouselPrevious />
           <CarouselNext />
    </Carousel>
  )
}
