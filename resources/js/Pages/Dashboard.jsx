import Pagination from '@/Components/Homepage/Pagination';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/inertia-react';
import { Head, router, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Dashboard(props) {
    const { auth, myInventories, flash } = props

    const [isMessage, setIsMessage] = useState(false)
    const { data, setData, post, processing, errors, reset, setError, clearErrors, get } = useForm({
        name: '',
        description: '',
        qty: '',
        price: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        const requiredFields = ['name', 'description', 'qty', 'price'];
        const errors = {};

        requiredFields.forEach((field) => {
            if (!data[field]) {
                errors[field] = 'This field is required!';
            } else {
                clearErrors(field);
            }
        });

        if (Object.keys(errors).length > 0) {
            setError(errors);
        } else {
            setIsMessage(true)
            clearErrors()
            reset()
            post('inventories', data)
            router.get('dashboard')
        }
    };

    // Remove message
    useEffect(() => {
        if (flash.message !== null) {
            const interval = setInterval(() => {
                setIsMessage(false);
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [flash]);

    // Get Inventories
    useEffect(() => {
        if (!myInventories?.data) {
            router.get('inventories')
        }
        return
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manages Your Item</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn btn-success text-white mb-2" onClick={()=>document.getElementById('my_modal_2').showModal()}>Create Item</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <div>
                                <InputLabel htmlFor="name" value="Item Name" />
                                <div className="py-2">
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="p-2 block w-full"
                                        autoComplete="name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="description" value="Description" />
                                <div className="py-2">
                                    <textarea required value={data?.description} onChange={(e) => setData('description', e.target.value)} className="p-2 block w-full border-gray-300" style={{borderRadius: '0.375rem', minHeight: '100px'}} />
                                    <InputError message={errors.description} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="qty" value="Qty" />
                                <div className="py-2">
                                    <TextInput
                                        id="qty"
                                        type="number"
                                        name="qty"
                                        value={data.qty}
                                        className="p-2 block w-full"
                                        autoComplete="qty"
                                        onChange={(e) => setData('qty', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.qty} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="price" value="Price" />
                                <div className="py-2">
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        className="p-2 block w-full"
                                        autoComplete="price"
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.price} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <button className="btn  btn-neutral btn-wide" disabled={processing} onClick={(e) => onSubmit(e)}>
                                    Submit
                                </button>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>x</button>
                        </form>
                    </dialog>
                    <div className="bg-slate-50 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {myInventories?.data?.length > 0 ? myInventories?.data?.map((inventory, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{inventory.name}</td>
                                        <td>{inventory.description}</td>
                                        <td>{inventory.qty}</td>
                                        <td>{inventory.price}</td>
                                        <td className='flex gap-2'>
                                            <div className="badge badge-outline badge-info">
                                                <Link href={route('inventories.edit')} method="get" data={{ id: inventory.id }}>
                                                    edit
                                                </Link>
                                            </div>
                                            <div className="badge badge-outline badge-error">
                                                <Link href={route('inventories.delete')} method="delete" data={{ id: inventory.id }}>
                                                    Remove
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) : <div className='flex justify-center items-center mt-4'>No rows available!</div>}
                                </tbody>
                            </table>
                        </div>
                        {myInventories?.data?.length > 0 && (
                            <div className="p-4 flex justify-center items-center">
                                <Pagination meta={myInventories?.meta} />  
                            </div>
                        )}
                    </div>

                    {/* <div className='p-4 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-stretch justify-center items-center'>
                        {myInventories?.data?.length > 0 ? myInventories?.data?.map((item, i) => (
                            <div key={i} className="card w-full lg:w-96 bg-base-100 shadow-xl gap-4">
                                <div className="card-body">
                                    <h2 className="card-title text-bold">{item?.name}</h2>
                                    <p>{item?.description}</p>
                                    <div className="flex gap-2">
                                    <div className="badge badge-info">Stock: {item?.qty}</div>
                                    <div className="badge badge-secondary">Price: {item?.price}</div>
                                    </div>
                                </div>
                            </div>
                        )) : <p>No data Available!</p>}
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
