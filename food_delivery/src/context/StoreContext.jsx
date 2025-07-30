import { createContext, useEffect, useState} from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>
{

    const[cartItems,setCartItems] =useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([]);


const addToCart = async (itemId) => {
        itemId = String(itemId);
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else
        {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId] + 1}))
        }
        if(token)
        {
            await axios.post(url + "/api/cart/add", { itemId }, {
    headers: { Authorization: `Bearer ${token}` }
});

        }
    };

const removeFromCart = async (itemId) => {
        itemId = String(itemId);
        setCartItems(prev => ({...prev,[itemId]:prev[itemId] - 1}));

        if(token)
        {
            axios.post(url + "/api/cart/remove",{ itemId }, {
            headers: { Authorization: `Bearer ${token}` }
            })
        }

    };


const fetchFoodList = async () => {
    try {
        const response = await axios.get(url + "/api/food/list");
        console.log("Fetched Food List:", response.data); // 👈 Check this
        setFoodList(response.data.data.foods); // Adjust if needed
    } catch (err) {
        console.error("Error fetching food list", err);
    }
};

const loadCartData = async (token) =>
{
    const response = await axios.post(url + "/api/cart/get",{}, {headers: { Authorization: `Bearer ${token}`} });
    setCartItems(response.data.cartData)
}

useEffect(() => {
  async function loadData() {
    await fetchFoodList(); // ✅ Step 1: Load food list first

    // ✅ Step 2: Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartItems(savedCart); // use your context function

    // ✅ Step 3: If token is present, load backend cart (and overwrite local cart if needed)
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      await loadCartData(storedToken); // Optional: Sync from backend if user is logged in
    }
  }

  loadData();
}, []);


const getTotalCartAmount = () => {
    let TotalAmount = 0;

    // Early return if food_list or cartItems are empty or not loaded
    if (!food_list || food_list.length === 0 || !cartItems || Object.keys(cartItems).length === 0) {
        return TotalAmount;
    }

    for (const itemId in cartItems) {
        const quantity = cartItems[itemId];
        if (quantity > 0) {
            // Match item from food_list
            const itemInfo = food_list.find(
                (product) => String(product._id) === String(itemId)
            );

            if (itemInfo && itemInfo.price) {
                TotalAmount += itemInfo.price * quantity;
            } else {
                console.warn(`Item info not found for ID: ${itemId}`);
            }
        }
    }

    return TotalAmount;
};




    
    const contextValue = 
    {   
         food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return(
        <>
            <StoreContext.Provider value={contextValue}>
                {props.children}
            </StoreContext.Provider>
        </>
    ) 
    

}
export default StoreContextProvider;