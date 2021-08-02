import client from "./client";

// Main Variety...........................................................

const endpoint_mainVariety = "/mainVariety.json";

const getListings_mainVariety = () => client.get(endpoint_mainVariety);

const addListing_mainVariety = (listing) => {
  const data = {
    name: listing.itemname,
    color: listing.color,
    image: listing.img,
    status: listing.status,
  };

  // const data = new FormData();
  // data.append("Name", listing.itemname);
  // data.append("Color", listing.color);
  // data.append("Image", listing.img);
  // data.append("Status", listing.status);

  return client.post(endpoint_mainVariety, JSON.stringify({ data }));
};

// SubVariety...........................................................
const endpoint_subVariety = "/subVariety.json";

const getListings_subVariety = () => client.get(endpoint_subVariety);

const addListing_subVariety = (listing) => {
  const data = {
    main_variety_id: listing.main_variety_id,
    name: listing.itemname,
    image: listing.img,
    L_cup: listing.L_Cup,
    M_cup: listing.M_Cup,
    status: listing.status,
  };

  // const data = new FormData();
  // data.append("Name", listing.itemname);
  // data.append("Color", listing.color);
  // data.append("Image", listing.img);
  // data.append("Status", listing.status);

  return client.post(endpoint_subVariety, JSON.stringify({ data }));
};

// Members...........................................................
const endpoint_members = "/members.json";

const getListings_members = () => client.get(endpoint_members);

const addListing_members = (listing) => {
  const data = {
    name: listing.name,
    phone: listing.phone,
    email: listing.email,
    cardNo: listing.cardNo,
    cup: listing.cup,
  };

  return client.post(endpoint_members, JSON.stringify({ data }));
};

const updateListing_members = (listing, id) => {
  const data = {
    name: listing.name,
    phone: listing.phone,
    email: listing.email,
    cardNo: listing.cardNo,
    cup: listing.cup,
  };

  return client.patch(`/members/${id}.json`, JSON.stringify({ data }));
};

// All Orders...........................................................
const endpoint_allOrders = "/allOrders.json";

const getListings_allOrders = () => client.get(endpoint_allOrders);

const addListing_allOrders = (date, name, listing, type) => {
  const data = {
    date: date,
    user: name,
    name: listing.name,
    cupSize: listing.cupSize,
    totalOrders: listing.numberOfOrders,
    totalAmount: listing.totalPrice,
    paymentType: type,
  };

  return client.post(endpoint_allOrders, JSON.stringify({ data }));
};

export default {
  addListing_mainVariety,
  getListings_mainVariety,

  addListing_subVariety,
  getListings_subVariety,

  getListings_members,
  addListing_members,
  updateListing_members,

  addListing_allOrders,
  getListings_allOrders,
};
