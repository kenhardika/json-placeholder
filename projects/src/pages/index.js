import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import fetchJSONPlaceholder from '../utils/fetchJSONPlaceholder';
import postAPI from '../utils/postAPI';
import editAPI from '../utils/editAPI';
import uniqid from 'uniqid';
import deleteAPI from '../utils/deleteAPI';


function Index(props) {
    const defaultData = {
        "id": 0,
        "name": "",
        "username": "",
        "email": "",
        "phone": "",
        "website": "",
        "company": {
        "name": "",
        "catchPhrase": "",
        "bs": ""
        }
        };
    const [showModal, setShowModal] = useState(false); 
    const [selectedData, setSelectedData] = useState({}); 
    const [showAddButton, setShowAddButton] = useState(false); 
    const [loading, setLoading] = useState(false);
    const handleModalClose =() => setShowModal(false);
    const handleModalOpen =() => setShowModal(true);
    const [data, setData] = useState({});
    
    const fetchData = useCallback(async (link) =>{
        const responseAPI = await fetchJSONPlaceholder(link);
        setData(responseAPI.data);
        return
    }, [])

    async function deleteSelectedData(selectedDataId){
        const responseAPI = await deleteAPI(selectedDataId);
            if(responseAPI.status === 200 || selectedDataId > 10){
                    const newData = data.filter((item)=> item.id !== selectedDataId);
                    setData(newData);
                }
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
        }));
    }

    async function handleEdit(e){
        e.preventDefault();
            if(selectedData.id<10){
                const responseAPI = await editAPI(selectedData);
                const updatedItems = data.map(item => item.id === responseAPI.data.id ? responseAPI.data : item);
                setData(updatedItems);
                handleModalClose();
                setLoading(false);
            } 
            else{
                const updatedItems = data.map(item => item.id === selectedData.id ? selectedData : item);
                setData(updatedItems);
                handleModalClose();
                setLoading(false);
            }
    }

    function randomizeID(){
        const randomId = Math.floor(Math.random()*50);
        if(data.some((item)=> item.id === randomId? true : false)){
            return randomizeID();
        }
        else{
            return randomId;
        }
    }
 
    async function handleSubmit(e){
        e.preventDefault();
        const responseAPI = await postAPI(selectedData);
        responseAPI.data.id = randomizeID();
        const responseData = responseAPI.data;
        setData((prev)=>([responseData, ...prev]));
        handleModalClose();
        setShowAddButton(false);
        setLoading(false);
        return
    }
    
    useEffect(()=>{
        fetchData(`https://jsonplaceholder.typicode.com/users/`);
    }, [fetchData])
    
    return (
        <div className='w-full h-full flex flex-col justify-center items-center p-5'>
            <button className="block w-[100px] h-[40px] text-white bg-red-400 hover:bg-red-600 
            font-medium rounded-lg text-sm text-center active:translate-y-[2px]"
            onClick={()=>{
                handleModalOpen();
                setSelectedData(defaultData);
                setShowAddButton(true);
                setLoading(false);
                }}>
            + Add 
            </button>

        { showModal? 
        <div className='h-screen w-screen left-0 top-0 fixed backdrop-blur-sm'>
            <div
                className="justify-center items-center flex fixed h-auto 
                inset-0 outline-none focus:outline-none bg-transparent">
                <div className='w-[750px] h-[500px] bg-white rounded-lg shadow-md'>
                    <div className='flex justify-end py-3 px-6 lg:px-8
                         text-white bg-white rounded-t-lg h-1/5 items-center'>
                        <button className='w-[30px] h-[30px] bg-red-600 hover:bg-red-600 
                            rounded-full text-sm text-center active:translate-y-[2px] p-1' 
                                onClick={()=>{
                                    handleModalClose();
                                    setShowAddButton(false);
                                    }}> X </button>
                    </div>
                        <form className='flex flex-col w-full h-4/5 gap-2 items-center space-y-4' 
                             id='formInput'
                            onSubmit={(e)=>{
                                if(showAddButton){
                                    handleSubmit(e);
                                    setLoading(true);
                                }
                                else{
                                    handleEdit(e);
                                    setLoading(true);
                                }
                                }}>
                                    
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-row w-full justify-end px-3 gap-14 '>
                                    <label htmlFor="name" className=''>Name: </label> 
                                    <input className='px-2 rounded-lg w-[300px] bg-gray-100 focus:outline outline-red-300' type="text" 
                                        name='name' placeholder='name' onChange={onChangeEvent} value={selectedData.name}/>
                                </div>
                                <div className='flex flex-row w-full justify-end px-3 gap-14 '>
                                    <label htmlFor="email" className=''>Email: </label> 
                                    <input className='px-2 rounded-lg w-[300px] bg-gray-100 focus:outline outline-red-300'  type="text" 
                                        name='email' placeholder='email' onChange={onChangeEvent} value={selectedData.email}/>
                                </div>
                                <div className='flex flex-row w-full justify-end px-3 gap-14 '>
                                    <label htmlFor="phone" className=''>Phone: </label> 
                                    <input className='px-2 rounded-lg w-[300px] bg-gray-100 focus:outline outline-red-300 ' type="text" 
                                        name='phone' placeholder='phone' onChange={onChangeEvent} value={selectedData.phone}/>
                                </div>
                                <div className='flex flex-row w-full justify-end px-3 gap-14 '>
                                    <label htmlFor="website" className=''>Website: </label> 
                                    <input className='px-2 rounded-lg w-[300px] bg-gray-100 focus:outline outline-red-300' type="text" 
                                        name='website' placeholder='website' onChange={onChangeEvent} value={selectedData.website} />
                                </div>
                                <div className='flex flex-row w-full justify-end px-3 gap-14 '>
                                    <label htmlFor="companyname" className=''>Company's Name: </label> 
                                    <input className='px-2 rounded-lg w-[300px] bg-gray-100 focus:outline outline-red-300' type="text" 
                                        name='name' placeholder="company's name" onChange={onChangeCompany} value={selectedData.company.name}/>
                                </div>
                                <div className='flex flex-row w-full justify-end px-3 gap-14'>
                                    <label htmlFor="companyBs">Company's BS: </label> 
                                    <input className='px-2 rounded-lg w-[300px] bg-gray-100 focus:outline outline-red-300' type="text" 
                                        name= 'bs' placeholder="company's bs" onChange={onChangeCompany} value={selectedData.company.bs}/>
                                </div>
                                <div className='flex flex-row w-full justify-end px-3 gap-14'>
                                    <label htmlFor="catchPhrase">Catch Phrase: </label> 
                                    <input className='px-2 rounded-lg w-[300px] bg-gray-100 focus:outline outline-red-300' type="text" 
                                        name= 'catchPhrase' placeholder='catch phrase' onChange={onChangeCompany} value={selectedData.company.catchPhrase}/>
                                </div>
                            </div>
                            <div className='flex flex-col w-[200px] h-[70px] items-center gap-2 justify-center text-white'>
                                    <button className='rounded-lg px-2 w-40 bg-red-300 
                                        text-sm active:translate-y-[2px] p-1' type='submit' form='formInput'> 
                                        { loading? 'loading...' : showAddButton? 'Add' : "Save" }   </button>
                                    <button className='rounded-lg px-2 w-40 bg-red-600 
                                        text-sm active:translate-y-[2px] p-1' form='formInput'
                                        onClick={()=>{
                                            setSelectedData(null);
                                            handleModalClose();
                                            setShowAddButton(false);
                                        }}> Cancel </button>
                            </div> 
                        </form> 
                    </div>
            </div>
        </div>
        : null
         }
            <div className='h-auto w-[1500px] border-solid p-5 gap-5 
                grid grid-cols-4'>
                {
                    Object.keys(data).length? 
                    data.map((item)=>
                        <Card key={uniqid()} data={item}  
                                onEdit = {(e)=>{
                                    e.preventDefault();
                                    setLoading(false);
                                    setShowModal(true);
                                    setSelectedData(item);
                                 }}
                                onDelete ={(e)=>{
                                    e.preventDefault();
                                    deleteSelectedData(item.id);
                                }}
                                 >
                        </Card>
                    ) 
                    : <p>No Data Loaded</p> 
                }
            </div>
        </div>
    );
}

export default Index;