import { useState } from "react"

const Dashboard = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [supplier_info, setSupplierInfo] = useState('')
    const [mfgDate, setMfgDate] = useState('')
    const [items, setItems] = useState([])

    const formSubmitHandler = async event => {



        event.preventDefault()
        const itemObject = {
            name, price, supplier_info, mfgDate
        }

        const itemResponse = await fetch('http://localhost:8000/item/add', {
            method: 'POST',
            body: JSON.stringify(itemObject),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        if(itemResponse.status === 200) {
            const item = await itemResponse.json()
            setItems( items => [item.data, ...items] )
        }



    }

    return <div>
        <h1> Add Inventory Item </h1>
        <form onSubmit={formSubmitHandler} >

            <div>
                <label htmlFor="name">Name:-</label>
                <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div>
                <label htmlFor="price">Price:-</label>
                <input id="price" value={price} onChange={event => setPrice(event.target.value)} />
            </div>

            <div>
                <label htmlFor="supplierInfo">Supplier Info:-</label>
                <input id="supplierInfo" value={supplier_info} onChange={event => setSupplierInfo(event.target.value)} />
            </div>

            <div>
                <label htmlFor="mfgDate">mfgDate:-</label>
                <input id="mfgDate" value={mfgDate} onChange={event => setMfgDate(event.target.value)} type="date" />
            </div>

            <div>
                <button type="submit" > Submit </button>
                <button> Reset </button>
            </div>

        </form>


        <h1> Items List:- </h1>
        <ul>
            {items.map( item => <li> {item.name} </li> )}
        </ul>

    </div>





}

export default Dashboard
