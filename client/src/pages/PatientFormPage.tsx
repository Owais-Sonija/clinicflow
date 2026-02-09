// client/src/pages/PatientFormPage.tsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ArrowLeft } from "lucide-react";
import { 
    createPatient, 
    updatePatient, 
    fetchPatientById,
    clearSelectedPatient,
    clearError 
} from '../features/patients/patientSlice';

import Header from '../components/layout/Header'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import Alert from '../components/ui/Alert'

// The patient form page component
function PatientFormPage() {
    // Redux hooks
    const { id } = useParams(); // Get the patient ID from the URL
    const isEditing = Boolean(id);
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { selectedPatient, isLoading, error } = useAppSelector((state) => state.patients);

    // State
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        condition: '',
        email: '',
        phone: '',
    });


        // Fetch patient if editing
        useEffect(() => {
            if (isEditing && id) {
                dispatch(fetchPatientById(id));
            }

            // Clear selected patient and error on unmount
            return () => {
                dispatch(clearSelectedPatient());
                dispatch(clearError());
            };
        }, [dispatch, id, isEditing]);

        // Populate form data with selected patient data
        useEffect(() => { 
            if (isEditing && selectedPatient) {
                setFormData({
                    name: selectedPatient.name,
                    age: String(selectedPatient.age),
                    condition: selectedPatient.condition,
                    email: selectedPatient.email || '',
                    phone: selectedPatient.phone || '',
                });
                
            }
        }, [selectedPatient, isEditing]);

        // Handle input changes
        const handleChange  = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        };

        // Handle form submission    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault(); // Prevent form submission

            // Patient data
            const patientData = {
                name: formData.name,
                age: Number(formData.age),
                condition: formData.condition,
                email: formData.email || undefined,
                phone: formData.phone || undefined,
            };

            // result
            let result;

            // If editing, update the patient
            if (isEditing && id) {
                result = await dispatch(updatePatient({id, data: patientData}));
            } else {
                // If not editing, create a new patient
                result = await dispatch(createPatient(patientData));
            }

            // Navigate back on success
            if (!result.type.includes('rejected')) {
                navigate('/patients');
            }
        };

        return (
        <div>
            <Header title={isEditing ? 'Edit Patient' : 'Add Patient'} />
            
            <div className="p-6">
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/patients')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Patients
                </button>
                
                {/* Error Alert */}
                {error && (
                    <Alert 
                        type="error" 
                        message={error} 
                        onClose={() => dispatch(clearError())}
                    />
                )}
                
                {/* Form Card */}
                <Card className="max-w-2xl p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        {isEditing ? 'Edit Patient Details' : 'New Patient Details'}
                    </h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                name="name"
                                type="text"
                                placeholder="Enter patient name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            
                            <Input
                                label="Age"
                                name="age"
                                type="number"
                                placeholder="Enter age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Condition
                                </label>
                                <select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select condition</option>
                                    <option value="General">General</option>
                                    <option value="Diabetes">Diabetes</option>
                                    <option value="Hypertension">Hypertension</option>
                                    <option value="Cardiac">Cardiac</option>
                                    <option value="Respiratory">Respiratory</option>
                                    <option value="Orthopedic">Orthopedic</option>
                                    <option value="Neurological">Neurological</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            
                            <Input
                                label="Email (Optional)"
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            
                            <Input
                                label="Phone (Optional)"
                                name="phone"
                                type="tel"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        
                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                            <Button 
                                type="button" 
                                variant="secondary"
                                onClick={() => navigate('/patients')}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                isLoading={isLoading}
                            >
                                {isEditing ? 'Update Patient' : 'Add Patient'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

// Export the component
export default PatientFormPage;
    
