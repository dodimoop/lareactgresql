import InventoriesList from '@/Components/Homepage/InventoriesList';
import Pagination from '@/Components/Homepage/Pagination';
import Navbar from '@/Components/Navbar';
import { Link, Head } from '@inertiajs/react';

const Homepage = (props) => {
    const { title, inventories, auth, searchQuery } = props;

    return (
        <div className='min-h-screen bg-slate-50'>
            <Head title="Homepage" />
            <Navbar isUserLogin={auth.user !== null} />
            <div className='p-4 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-stretch justify-center items-center'>
              <InventoriesList data={props.inventories.data} />
            </div>
            {inventories?.data?.length > 0 && (
              <div className="p-4 flex justify-center items-center">
                <Pagination meta={inventories?.meta} />  
              </div>
            )}
        </div>
    );
}

export default Homepage