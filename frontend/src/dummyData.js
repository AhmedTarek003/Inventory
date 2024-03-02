import { BsBuildingsFill, BsPeopleFill, BsDatabaseGear } from "react-icons/bs";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { FaFileInvoice, FaBagShopping } from "react-icons/fa6";
export const SidebarLists = [
  {
    head: "Manage Suppliers ",
    icon: <BsBuildingsFill />,
    headLists: [
      {
        title: "All Suppliers",
        link: "allSuppliers",
      },
    ],
  },
  {
    head: "Manage Customers ",
    icon: <BsPeopleFill />,
    headLists: [
      {
        title: "All Customers",
        link: "allCustomers",
      },
      {
        title: "Important Customers",
        link: "ImCustomers",
      },
    ],
  },
  {
    head: "Manage Category ",
    icon: <BiSolidCategoryAlt />,
    headLists: [
      {
        title: "All Categories",
        link: "allCategories",
      },
    ],
  },
  {
    head: "Manage Products ",
    icon: <BsDatabaseGear />,
    headLists: [
      {
        title: "All Products",
        link: "allProducts",
      },
    ],
  },
  {
    head: "Manage Transactions ",
    icon: <GrTransaction />,
    headLists: [
      {
        title: "Suppliers Transactions",
        link: "suppliersTransactions",
      },
      {
        title: "Customers Transactions",
        link: "customersTransactions",
      },
    ],
  },
  {
    head: "Manage Invoice ",
    icon: <FaFileInvoice />,
    headLists: [
      {
        title: "Suppliers Invoice",
        link: "suppliersInvoice",
      },
      {
        title: "Customers Invoice",
        link: "customersInvoice",
      },
    ],
  },
  {
    head: "Manage Stock ",
    icon: <FaBagShopping />,
    headLists: [
      {
        title: "In Stock",
        link: "inStock",
      },
      {
        title: "Out Of Stock",
        link: "outOfStock",
      },
    ],
  },
];
