import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";

import Loader from "../components/Loader";
import ProductCard from "./products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio, productSearch } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();

  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 999999999 });

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  let uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            console.log(
              `prod:${product.price} min:${priceFilter.min} max:${priceFilter.max}`
            );
            return !productSearch?.length
              ? product.price >= priceFilter.min &&
                  product.price <= priceFilter.max
              : product.name.toString().toLowerCase().includes(productSearch) &&
                  product.price >= priceFilter.min &&
                  product.price <= priceFilter.max;
          }
        );

        uniqueBrands = [
          ...Array.from(
            new Set(
              filteredProductsQuery.data
                ?.map((product) => product.brand)
                .filter((brand) => brand !== undefined)
            )
          ),
        ];
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    dispatch,
    priceFilter,
    productSearch,
  ]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const handleMinPriceChange = (e) => {
    setPriceFilter({ min: parseFloat(e.target.value), ...priceFilter });
  };

  const handleMaxPriceChange = (e) => {
    setPriceFilter({ ...priceFilter, max: parseFloat(e.target.value) });
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="w-[20vw] bg-[#DDDDDD] p-3 mt-2 mb-2">
            <h2 className="text-center p-2 bg-white rounded-full mb-2">
              Filter by Categories
            </h2>
            <div className="p-5">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={c._id}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-emerald-500 bg-gray-100 border-gray-300 rounded
                      focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800
                      focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor={c._id}
                      className="ml-2 text-sm font-medium dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-center py-2 bg-white rounded-full mb-2">
              Filter by Brands
            </h2>
            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <div className="flex items-center mr-4 mb-5" key={brand}>
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-emerald-500 bg-gray-100 border-gray-300 focus:ring-emerald-500
                      dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                      dark:border-gray-600"
                  />

                  <label
                    htmlFor={brand}
                    className="ml-2 text-sm font-medium dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            <h2 className="text-center py-2 bg-white rounded-full mb-2">
              Filter by Price
            </h2>
            <span className="flex justify-around">
              <input
                type="number"
                placeholder="Min"
                value={priceFilter.min === 0 ? "" : priceFilter.min}
                onChange={handleMinPriceChange}
                className="w-[40%] px-3 py-2 placeholder-gray-400 border rounded-lg
                focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceFilter.max === 999999999 ? "" : priceFilter.max}
                onChange={handleMaxPriceChange}
                className="w-[40%] px-3 py-2 placeholder-gray-400 border rounded-lg
                focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </span>

            <div className="p-5 pt-0">
              <button
                className="w-full border rounded-full border-gray-400 text-white py-1 bg-zinc-700 mt-8 mb-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="py-3 w-full">
            <h2 className="text-center mb-2">Products: {products?.length}</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
