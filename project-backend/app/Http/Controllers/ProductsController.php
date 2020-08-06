<?php

namespace App\Http\Controllers;

use App\Http\Requests\Products\Store;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{

    public function index()
    {
        $products = Product::query() -> paginate(10);
        return response() -> json([
            'success' => true,
            'data'    => $products
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Store $request)
    {
        $created = Product::query() -> create([
            'name' => $request -> get('name'),
            'category' => $request -> get('category'),
            'description' => $request -> get('description'),
            'price' => $request -> get('price'),
        ]);
        if ($created){
            return response() -> json([
                'success' => true,
                'message' => 'Product successfully created'
            ]);
        } else {
            // todo failed response
        }
    }

    public function show($id)
    {
        $product = Product::query() -> findOrFail($id);
        return response() -> json([
            'success' => true,
            'data'    => $product
        ]);
    }

    public function edit($id)
    {
        //
    }

    public function update(Store $request, Product $product)
    {
        $updated = $product -> update([
            'name' => $request -> get('name'),
            'category' => $request -> get('category'),
            'description' => $request -> get('description'),
            'price' => $request -> get('price'),
        ]);
        if ($updated){
            return response() -> json([
                'success' => true,
                'message' => 'Product successfully updated'
            ]);
        } else {
            // todo failed response
        }
    }

    public function destroy(Product $product)
    {
        $deleted = $product -> delete();
        if ($deleted){
            return response() -> json([
                'success' => true,
                'message' => 'Product successfully deleted'
            ]);
        } else {
            // todo failed response
        }
    }
}
