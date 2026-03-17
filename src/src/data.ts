// src/data.ts

[span_0](start_span)// These categories match the buttons in your UI navigation[span_0](end_span)
export const categories = [
  "All", 
  "Notebooks", 
  "Writing", 
  "Printing"
];

[span_1](start_span)[span_2](start_span)// This array contains the product details used in your product grid[span_1](end_span)[span_2](end_span)
export const stationeryProducts = [
  {
    id: 1, 
    name: "Classic Ruled Notebook", 
    category: "Notebooks", 
    price: 50, 
    description: "200 pages, high-quality paper perfect for long lectures.", 
    image: "📓" 
  },
  {
    id: 2,
    name: "Blue Gel Pens (Pack of 5)",
    category: "Writing",
    price: 40,
    description: "Smooth writing gel pens, guaranteed not to smudge during exams.",
    image: "🖊️"
  },
  {
    id: 3,
    name: "A4 Printing Paper (Ream)",
    category: "Printing",
    price: 250,
    description: "500 sheets of crisp white A4 paper for your Xerox and assignment needs.",
    image: "📄"
  }
];
  
