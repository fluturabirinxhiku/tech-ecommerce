import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";

const generateInvoice = (order) => {
  console.log(order);
  console.log("hello there");
  const props = {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "Order Invoice",
    orientationLandscape: false,
    logo: {
      src: "https://res.cloudinary.com/dimx7r41s/image/upload/v1625771315/TECHSHOP5-removebg-preview_l3jhxs.png",
      width: 53.33, //aspect ratio = width/height
      height: 40.66,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    business: {
      name: "TechShop",
      address: "Prishtina, Kosovo",
      phone: "(+383) 45 11 11 111",
      email: "info@techshop.com",

      website: "www.techshop.com",
    },
    contact: {
      label: "Invoice issued for:",
      name: order.user.name,
      address: order.shippingInfo.address,
      phone: order.shippingInfo.phoneNo,
      email: order.user.email,
    },
    invoice: {
      label: "Order ID: ",
      num: order._id,
      invDate: `Payment Date: ${new Date(order.paidAt).toLocaleString(
        "en-GB"
      )}`,
      invGenDate: `Invoice Date: ${new Date().toLocaleString("en-GB")}`,
      headerBorder: false,
      tableBodyBorder: false,
      header: ["#", "Name", "Price", "Quantity", "Total"],
      table: Array.from(order.orderItems, (item, index) => [
        index + 1,
        item.name,
        item.price,
        item.quantity,
        (item.price * item.quantity).toFixed(2),
      ]),
      shippingLabel: "Shipping",
      shipping: order.shippingPrice,
      invTotalLabel: "Total:",
      invTotal: order.totalPrice.toFixed(2),
      invCurrency: "USD",
      row1: {
        col1: "Shipping:",
        col2: order.shippingPrice.toFixed(2),
        col3: "USD",
        style: {
          fontSize: 10, //optional, default 12
        },
      },

      row2: {
        col1: "Subtotal:",
        col2: order.itemsPrice.toFixed(2),
        col3: "USD",
        style: {
          fontSize: 10, //optional, default 12
        },
      },
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };

  jsPDFInvoiceTemplate(props);
};
export default generateInvoice;
