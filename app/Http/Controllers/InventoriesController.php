<?php

namespace App\Http\Controllers;

use App\Http\Resources\InventoriesCollection;
use App\Models\Inventories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class InventoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inventories = new InventoriesCollection(Inventories::OrderByDesc('id')->paginate(9));
        return Inertia::render('Homepage', [
            'title' => 'Hi, This is Homepage!',
            'inventories' => $inventories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $inventories = new Inventories();
        $inventories->name = $request->name;
        $inventories->description = $request->description;
        $inventories->qty = $request->qty;
        $inventories->price = $request->price;
        $inventories->author_user_id = auth()->user()->id;
        $inventories->save();
        return redirect()->back()->with('message', 'Create item successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventories $inventories)
    {
        $myInventories = Inventories::where('author_user_id', auth()->user()->id)->orderByDesc('id')->paginate(9);
            
        return Inertia::render('Dashboard', [
            'myInventories' => new InventoriesCollection($myInventories)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventories $inventories, Request $request)
    {
        return Inertia::render('EditInventories', [
            'myInventories' => $inventories->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inventories $inventories)
    {
        $inventories = Inventories::find($request->id);
        $inventories->name = $request->name;
        $inventories->description = $request->description;
        $inventories->qty = $request->qty;
        $inventories->price = $request->price;
        $inventories->save();

        return redirect()->route('dashboard');

    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventories $inventories, Request $request)
    {
        $inventories = Inventories::find($request->id);
        $inventories->delete();
        return redirect()->back()->with('message', 'Remove successfully!');
    }

    /**
        * Search inventories by name.
    */
    public function search(Request $request)
    {
        $searchQuery = $request->searchQuery;
        // dd($searchQuery);
        $inventories = Inventories::where('author_user_id', auth()->user()->id)
            ->where('name', 'like', '%' . $searchQuery . '%')
            ->orderByDesc('id')
            ->paginate(9);
        
        return Inertia::render('Homepage', [
            'inventories' => new InventoriesCollection($inventories)
        ]);
    }

}
