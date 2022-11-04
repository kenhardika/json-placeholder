import React from 'react';

function Card({data, selectedData}) {
    return (
        <div className='card h-full w-full p-4  gap-4 flex flex-row border-solid border-black border-2 rounded-lg '>
            <div className="leftSide h-full w-1/2 flex flex-col justify-between">
                <article>
                    <p className='font-semibold pb-1'> Personal </p>
                    <p className='font-normal py-0.5 text-xs'> {data.name} </p>
                    <p className='font-normal py-0.5 text-xs'> {data.email} </p>
                    <p className='font-normal py-0.5 text-xs'> {data.phone} </p>
                    <p className='font-normal py-0.5 text-xs'> {data.website} </p>
                </article>                
                
                <div className="flex flex-row gap-3">
                    <button onClick={()=>selectedData(data)} className='block w-[50px] h-[30px] text-white bg-red-400 hover:bg-red-600 
                    font-medium rounded-lg text-sm text-center active:translate-y-1'> edit </button>
                     <button onClick={()=>selectedData(data)} className='block w-[50px] h-[30px] text-white bg-red-400 hover:bg-red-600 
                    font-medium rounded-lg text-sm text-center active:translate-y-1'> delete </button>
                </div>

            </div> 
            <div className="leftSide h-full w-1/2">
                <p className='font-semibold pb-1'> Company </p>
                <p className='font-normal py-0.5 text-xs'> {data.company.name} </p>
                <p className='font-normal py-0.5 text-xs'> {data.company.bs} </p>
                <p className='font-normal py-0.5 text-xs'> {data.company.catchPhrase} </p>
            </div> 
            
        </div>
    );
}

export default Card;