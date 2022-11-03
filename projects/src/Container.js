import React, { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import fetchJSONPlaceholder from './utils/fetchJSONPlaceholder';

function Container(props) {

    const [showModal, setShowModal] = useState(false); // tambah selected data 
    const [selectedData, setSelectedData] = useState({});
    const handleModalClose =() => setShowModal(false);
    const handleModalOpen =() => setShowModal(true);

    const [data, setData] = useState({});
    
    const fetchData = useCallback(async (link) =>{
        try{
            const responseAPI = await fetchJSONPlaceholder(link);
            // console.log(responseAPI);
            setData(responseAPI.data);
            return
        }
        catch{
            throw Error('ERROR FETCH')
        }
    }, [])

    const fetchSelectedData = (data) =>{
        setSelectedData(data);
    }

    useEffect(()=>{
        fetchData(`https://jsonplaceholder.typicode.com/users/`);
    }, [fetchData])

    console.log(selectedData);

    return (
        <div className='w-full h-full flex flex-col justify-center items-center p-10'>
            <button className="block w-[100px] h-[40px] text-white bg-red-400 hover:bg-red-600 
            font-medium rounded-lg text-sm text-center active:translate-y-1" onClick={handleModalOpen}>
            + Add 
            </button>

        { showModal? // MODALLLLLLLL
        
        <div className='h-screen w-screen left-0 top-0 fixed bg-white'>
            <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto absolute inset-0 outline-none 
            focus:outline-none" onClick={handleModalClose}>
                <div className='w-1/4 h-96 bg-slate-700'>
                    <div className='flex justify-end py-6 px-6 lg:px-8 text-white bg-slate-500'>
                        <button className='w-10 h-auto bg-red-600' onClick={handleModalClose}> close </button>
                    </div>
                </div>
            </div>
        </div>

        : null
         } 
        { 
            //         MODAL DONEEEEEE
          // todo add background modal backgroundd 
        }
            <div className='h-[700px] w-[1500px] border-solid p-5 gap-5 grid grid-cols-4 grid-flow-row'>
                {
                    Object.keys(data).length? 
                    data.map((item)=>{
                        return <Card data={item} selectedData = {fetchSelectedData} ></Card>
                    }) : <p>loading</p> 
                }
            </div>
        </div>
    );
}

export default Container;