import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumb = () => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        const breadcrumbData = [
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Analytics', path: '/dashboard/analytics' },
            { label: 'Remo', path: '/dashboard/remo' },
            { label: 'Forms', path: '/dashboard/forms' },
            { label: 'Users', path: '/dashboard/users' },
            { label: 'Properties', path: '/dashboard/properties' },
            { label: 'Events', path: '/dashboard/events' }
        ];
        
        const currentBreadcrumbs = breadcrumbData.filter(item => pathname.startsWith(item.path));
        setBreadcrumbs(currentBreadcrumbs);
    }, [pathname]);

    return (
        <section className='bg-gray-100 py-4'>
            <nav aria-label='breadcrumb' className='container mx-auto'>
                <ol className='flex space-x-4'>
                    {
                        breadcrumbs.map((breadcrumb, index) => (
                            <li key={index} className='flex items-center'>
                                {index !== 0 && (
                                    <svg className='w-4 h-4 mr-1' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7' />
                                    </svg>
                                )}
                                {
                                    index === breadcrumbs.length - 1 ? (
                                        <span className='font-medium'>{breadcrumb.label}</span>
                                    ) : (
                                        <a href={breadcrumb.path} className='text-blue-500 hover:underline'>{breadcrumb.label}</a>
                                    )
                                }
                            </li>
                        ))
                    }
                </ol>
            </nav>
        </section>
    );
};

export default Breadcrumb;
