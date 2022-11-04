import React, { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import fetchJSONPlaceholder from './utils/fetchJSONPlaceholder';
import postAPI from './utils/postAPI';

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

    

    function onChangeEvent(e){
        e.preventDefault();
        setSelectedData((prev)=>({...prev,
            [e.target.name]: e.target.value
        }));
    }
    function onChangeCompany(e){
        e.preventDefault();
        setSelectedData((prev)=>({...prev,
            company: { ...prev.company,
                [e.target.name]: e.target.value 
                }    
        }))
    }

   async function handleSubmit(e){
        e.preventDefault();
        try{
            const responseAPI = await postAPI(selectedData);
            console.log(responseAPI.data);
            const responseData = responseAPI.data;
            setData((prev)=>([...prev, responseData]));
            // console.log(responseData);
            // console.log(data);
            return
        }
        catch{ }
        
    }

    useEffect(()=>{
        fetchData(`https://jsonplaceholder.typicode.com/users/`);
    }, [fetchData])

    console.log(data);

    return (
        <div className='w-full h-full flex flex-col justify-center items-center p-10'>
            <button className="block w-[100px] h-[40px] text-white bg-red-400 hover:bg-red-600 
            font-medium rounded-lg text-sm text-center active:translate-y-1"
            onClick={()=>{
                handleModalOpen();
                setSelectedData(null);
                }}>
            + Add 
            </button>

        { showModal? 
        <div className='h-screen w-screen left-0 top-0 fixed backdrop-blur-sm'>
            <div
                className="justify-center items-center flex fixed h-auto inset-0 outline-none 
                focus:outline-none bg-transparent">
                <div className='w-1/4 h-96 bg-red-400 rounded-lg'>
                    <div className='flex justify-end py-3 px-6 lg:px-8 text-white bg-red-200 rounded-t-lg'>
                        <button className='w-10 h-auto bg-red-600 hover:bg-red-600  rounded-lg text-sm text-center active:translate-y-1 p-1' onClick={handleModalClose}> close </button>
                    </div>
                    <div className='h-80 flex flex-col justify-center p-4'>
                        <form className='flex flex-col gap-2 items-center' 
                            action="/" method="post" 
                            onSubmit={(e)=>{
                                handleSubmit(e);
                                handleModalClose();
                                }}>
                            <input className='px-2 rounded-lg' type="text" name='name' placeholder='name' onChange={onChangeEvent}/>
                            <input className='px-2 rounded-lg' type="text" name='email' placeholder='email' onChange={onChangeEvent}/>
                            <input className='px-2 rounded-lg' type="text" name='phone' placeholder='phone' onChange={onChangeEvent}/>
                            <input className='px-2 rounded-lg' type="text" name='website' placeholder='website' onChange={onChangeEvent}/>
                            <input className='px-2 rounded-lg' type="text" name='name' placeholder="company's name" onChange={onChangeCompany}/>
                            <input className='px-2 rounded-lg' type="text" name= 'bs' placeholder="company's bs" onChange={onChangeCompany}/>
                            <input className='px-2 rounded-lg' type="text" name= 'catchPhrase' placeholder='catch phrase' onChange={onChangeCompany}/>

                            <button className='rounded-lg px-2 w-40 bg-red-300 text-sm active:translate-y-1 p-1' type='submit' > Add </button>
                            <button className='rounded-lg px-2 w-40 bg-red-600 text-sm active:translate-y-1 p-1'> Cancel </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        : null
         } 
        { 
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