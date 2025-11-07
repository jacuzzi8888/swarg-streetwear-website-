import React, { useState, useEffect } from 'react';
import type { EditableItem } from '../types';

interface AdminEditModalProps {
  item: EditableItem;
  onClose: () => void;
  onSave: (item: EditableItem) => void;
}

// Reusable input component for consistent styling
const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>> = (props) => {
    const commonClasses = "w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition";
    if (props.type === 'textarea') {
        return <textarea {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>} className={commonClasses} rows={3} />;
    }
    return <input {...props as React.InputHTMLAttributes<HTMLInputElement>} className={commonClasses} />;
};

/**
 * Resizes an image file on the client-side using a canvas.
 * @param file The image file to resize.
 * @param maxWidth The maximum width of the output image.
 * @param maxHeight The maximum height of the output image.
 * @returns A promise that resolves with a base64 encoded string of the resized image.
 */
const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return reject(new Error('Could not get canvas context'));
                }
                ctx.drawImage(img, 0, 0, width, height);
                // Get the data URL with the original MIME type to support various formats (jpeg, webp, etc.)
                resolve(canvas.toDataURL(file.type));
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};


export const AdminEditModal: React.FC<AdminEditModalProps> = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData(prev => ({ ...prev, [name]: isNumber ? parseFloat(value) : value }));
  };
  
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file (e.g., JPG, PNG, WEBP).');
            return;
        }

        try {
            // Resize the image to a max dimension of 800px for web optimization
            const resizedImageUrl = await resizeImage(file, 800, 800);
            setFormData(prev => ({ ...prev, imageUrl: resizedImageUrl }));
        } catch (error) {
            console.error('Error resizing image:', error);
            alert('Failed to process image. Please try another file.');
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const getTitle = () => {
      if ('price' in item) return `Editing Product: ${item.name}`;
      if ('description' in item) return `Editing Upcoming: ${item.name}`;
      if ('subtitle' in item) return `Editing Article: ${item.title}`;
      return 'Edit Item';
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-11/12 max-w-lg p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10" aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h2 className="text-xl font-bold mb-6 pr-8">{getTitle()}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
            {'name' in formData && <FormInput name="name" value={formData.name} onChange={handleChange} placeholder="Name" />}
            {'title' in formData && <FormInput name="title" value={formData.title} onChange={handleChange} placeholder="Title" />}
            
            {/* Conditional Fields */}
            {'price' in formData && <FormInput name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" />}
            {'description' in formData && <FormInput name="description" type="textarea" value={formData.description} onChange={handleChange} placeholder="Description" />}
            {'subtitle' in formData && <FormInput name="subtitle" type="textarea" value={formData.subtitle} onChange={handleChange} placeholder="Subtitle" />}
            
            {/* Image Uploader */}
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Cover Image</label>
                <div className="flex items-center space-x-4">
                    <img src={formData.imageUrl} alt="Current" className="w-20 h-20 object-cover rounded-md bg-gray-800" />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-black hover:file:bg-cyan-400"/>
                </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm font-bold bg-gray-700 hover:bg-gray-600 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-md text-sm font-bold bg-cyan-500 text-black hover:bg-white transition-colors">Save Changes</button>
            </div>
        </form>
      </div>
    </div>
  );
};