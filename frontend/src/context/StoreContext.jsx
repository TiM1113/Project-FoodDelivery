import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
// import {food_list} from '../assets/assets'; we don't need to import food_list form assets folder anymore.


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const [cartItems, setCartItems] = useState({});

  // this url variable will be passed in the context value
  const url = "http://localhost:4000"
  // to create one token state variable default it as empty ""
  const [token, setToken] = useState("")

  // create one arrow function to fetch food list from the database
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  }

  // to create one state variable to save food like to database instead of loading assets from local assets folder.
  const [food_list, setFoodList] = useState([])// then we don't need to import food_list form assets folder anymore.

  // this is the frontend addToCart function, align with backend addToCart function to process cart logic
	const addToCart = async (itemId) => {
		if (!cartItems[itemId]) {
			setCartItems((prev) => ({...prev, [itemId]: 1}));
		} else {
			setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
		}
    // add another if else statement to check a token weather available, then update to backend database. after this, addToCart function will be convert to async function
    if (token) {
      await axios.post(url + "/api/cart/add", {itemId}, {headers:{token}})
    }
	};

	const removeFromCart = (itemId) => {
		setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
	};

	const getTotalCartAmount = () => {
		let totalAmount = 0;
		for (const item in cartItems) {
			if (cartItems[item] > 0) {
				let itemInfo = food_list.find((product) => product._id === item);
				totalAmount += itemInfo.price * cartItems[item];
			}
		}
    return totalAmount;
	};

  // use useEffect function to save token state within local storage 
  useEffect(() => {
    
    async function loadData(){
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [])

	const contextValue = {
		food_list,
		cartItems,
		setCartItems,
		addToCart,
		removeFromCart,
    getTotalCartAmount,
    url,// pass the url variable as value in content
    token,
    setToken
	};
	return (
		<StoreContext.Provider value={contextValue}>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreContextProvider;
