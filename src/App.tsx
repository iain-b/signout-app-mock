import React from "react";
import "./App.css";
import { AEAdmissionForm } from "./AEAdmissionForm";

function App() {
  return (
    <div className="bg-blue-50">

        <div className="max-w-4xl mx-auto px-4 bg-white">
            <h2 className="text-2xl text-gray-700 p-1 pt-8 pb-2"> MMUH Sugical Sign-Out</h2>
            <div className="grid grid-cols-2">
                <div className="p-1">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <tbody>
                        <tr className="bg-blue-50 border-b">
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Consultant</th>
                            <td className="px-6 py-3 text-sm text-gray-900">Mr. John Doe</td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Registrar</th>
                            <td className="px-6 py-3 text-sm text-gray-900">Jane Smith</td>
                        </tr>
                        <tr className="bg-blue-50">
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">SHO</th>
                            <td className="px-6 py-3 text-sm text-gray-900">Alice Johnson</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-1">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <tbody>
                            <tr className="bg-blue-50 border-b">
                                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Operations</th>
                                <td className="px-6 py-3 text-sm text-gray-900">1</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">A + E Admissions
                                </th>
                                <td className="px-6 py-3 text-sm text-gray-900">2</td>
                            </tr>
                            <tr className="bg-blue-50 border-b">
                                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">A + E Discharges
                                </th>
                                <td className="px-6 py-3 text-sm text-gray-900">1</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">A + E Consults
                                </th>
                                <td className="px-6 py-3 text-sm text-gray-900">2</td>
                            </tr>
                            <tr className="bg-blue-50 border-b">
                                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Referrals to
                                    Medical Team
                                </th>
                                <td className="px-6 py-3 text-sm text-gray-900">1</td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">In House
                                    Consults
                                </th>
                                <td className="px-6 py-3 text-sm text-gray-900">1</td>
                            </tr>
                            <tr className="bg-blue-50">
                                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">Floor Issues</th>
                                <td className="px-6 py-3 text-sm text-gray-900">0</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-2">
                    <AEAdmissionForm/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
