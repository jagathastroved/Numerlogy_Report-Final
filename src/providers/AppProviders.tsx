import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import { ReportProvider } from "../context/ReportContext";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/numerology-report/">
        <ReportProvider>
          {children}
        </ReportProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
