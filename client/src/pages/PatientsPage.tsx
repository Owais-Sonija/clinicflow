// client/src/pages/PatientsPage.tsx

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPatients, deletePatient } from '../features/patients/patientSlice';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Alert from '../components/ui/Alert';


// The patients page component
function PatientsPage() {
    // Redux hooks
    const dispatch = useAppDispatch();
    const { patients, isLoading, error } = useAppSelector((state) => state.patients);

    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Fetch patients on component mount
    useEffect(() => {
        dispatch(fetchPatients());
    },
    [dispatch]); // Only fetch patients when the component mounts

    // Filter patients by search term
    const filteredPatients = patients.filter((patient) => {
        // Convert search term to lowercase
        return patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Delete patient
    const handleDelete = async (id: string) => {
        try {
            await dispatch(deletePatient(id));
            setDeleteId(null);
        } catch (error) {
            console.log(error);
        }
    };

 return (
        <div>
            <Header title="Patients" />
            
            <div className="p-6">
                {/* Error Alert */}
                {error && (
                    <Alert type="error" message={error} />
                )}
                
                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    {/* Add Button */}
                    <Link to="/patients/add">
                        <Button className="flex">
                            <Plus size={20} className="mr-2" />
                            Add Patient
                        </Button>
                    </Link>
                </div>
                
                {/* Patients Table */}
                <Card>
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">
                            Loading patients...
                        </div>
                    ) : filteredPatients.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No patients found
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                                            Name
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                                            Age
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                                            Condition
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                                            Status
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                                            Contact
                                        </th>
                                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatients.map((patient) => (
                                        <tr 
                                            key={patient._id} 
                                            className="border-t border-gray-100 hover:bg-gray-50"
                                        >
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm">
                                                        {patient.name.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-gray-800">
                                                        {patient.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {patient.age} years
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {patient.condition}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    patient.isAdmitted 
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {patient.isAdmitted ? 'Admitted' : 'Outpatient'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">
                                                {patient.phone || patient.email || 'N/A'}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex justify-end gap-2">
                                                    <Link to={`/patients/edit/${patient._id}`}>
                                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                            <Edit size={18} />
                                                        </button>
                                                    </Link>
                                                    <button 
                                                        onClick={() => setDeleteId(patient._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>
            
            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Delete Patient
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this patient? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <Button 
                                variant="secondary" 
                                onClick={() => setDeleteId(null)}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="danger" 
                                onClick={() => handleDelete(deleteId)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// Export the component
export default PatientsPage;
    
