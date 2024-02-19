import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/inertia-react';
import { Head, router } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function EditInventories(props) {
    const { auth, myInventories } = props

    const { data, setData, processing, errors, reset, setError, clearErrors } = useForm({
        id: myInventories?.id,
        name: myInventories?.name,
        description: myInventories?.description,
        qty: myInventories?.qty,
        price: myInventories?.price,
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
            clearErrors()
            reset()
            Inertia.put('/inventories/update', data)
            router.get('/')
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit item of <span className='uppercase text-bold'>{myInventories?.name}</span></h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-slate-50 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div>
                            <InputLabel htmlFor="name" value="Item Name" />
                            <div className="py-2">
                                <TextInput
                                    id="name"
                                    name="name"
                                    defaultValue={data?.name}
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
                                <textarea required defaultValue={data?.description} onChange={(e) => setData('description', e.target.value)} className="p-2 block w-full border-gray-300" style={{borderRadius: '0.375rem', minHeight: '100px'}} />
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
                                    defaultValue={data?.qty}
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
                                    defaultValue={data?.price}
                                    className="p-2 block w-full"
                                    autoComplete="price"
                                    onChange={(e) => setData('price', e.target.value)}
                                    required
                                />
                                <InputError message={errors.price} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="btn btn-neutral btn-wide" disabled={processing} onClick={(e) => onSubmit(e)}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
