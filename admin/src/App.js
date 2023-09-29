import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Category from "./scenes/category";
import SubCategory from "./scenes/subcategory";
import NewCategory from "./scenes/category/newCategory";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import EditCategory from "./scenes/category/editCategory";
import EditQuestion from "./scenes/question/EditQuestion";
import QuestionForm from "./scenes/question/QuestionForm";
import AllQuestions from "./scenes/question";
import NewSubCategory from "./scenes/subcategory/newSubCategory";
import EditSubCategory from "./scenes/subcategory/editSubCategory";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Category />} />
              <Route path="/new-category" element={<NewCategory />} />
              <Route path="/edit-category/:categoryId" element={<EditCategory/>} />

              <Route path="/question" element={<AllQuestions/>} />
              <Route path="/new-question" element={<QuestionForm/>} />
              <Route path="/edit-question/:questionId" element={<EditQuestion/>} />

              <Route path="/subcategory" element={<SubCategory />} />
              <Route path="/new-subcategory" element={<NewSubCategory />} />
              <Route path="/edit-subcategory/:subcategoryId" element={<EditSubCategory/>} />



            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
