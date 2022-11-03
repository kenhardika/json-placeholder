import React from 'react';

function Card({data, selectedData}) {
    return (
        <div className='card h-full w-full p-2 flex flex-row border-solid border-black border-2 overflow-hidden '>
            <div className="leftSide h-full w-1/2 flex flex-col justify-between">
                <article>
                    <p className='font-semibold'> Personal </p>
                    <p className='font-normal text-sm'> {data.name} </p>
                    <p className='font-normal text-sm'> {data.email} </p>
                    <p className='font-normal text-sm'> {data.phone} </p>
                    <p className='font-normal text-sm'> {data.website} </p>
                </article>                
                
                <div className="flex flex-row gap-3">
                    <button onClick={()=>selectedData(data)} className='block w-[50px] h-[30px] text-white bg-red-400 hover:bg-red-600 
                    font-medium rounded-lg text-sm text-center active:translate-y-1'> edit </button>
                     <button onClick={()=>selectedData(data)} className='block w-[50px] h-[30px] text-white bg-red-400 hover:bg-red-600 
                    font-medium rounded-lg text-sm text-center active:translate-y-1'> delete </button>
                </div>

            </div> 
            <div className="leftSide h-full w-1/2">
                <p className='font-semibold'> Company </p>
                <p className='font-normal text-sm'> {data.company.name} </p>
                <p className='font-normal text-sm'> {data.company.bs} </p>
                <p className='font-normal text-sm'> {data.company.catchPhrase} </p>
            </div> 
            
        </div>
    );
}

export default Card;