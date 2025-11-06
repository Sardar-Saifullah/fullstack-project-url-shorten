import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import { useDispatch } from 'react-redux';
import { getOriginalUrlAsync } from '../store/actions/urlActions';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        // Use the service to get the original URL and increment count
        const originalUrl = await dispatch(getOriginalUrlAsync(shortCode));
        
        if (originalUrl) {
          // Redirect to the original URL
          window.location.href = originalUrl;
        } else {
          // If no URL found, redirect to home page
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Redirect error:', error);
        window.location.href = '/';
      }
    };

    redirectToOriginalUrl();
  }, [shortCode, dispatch]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Spin size="large" />
      <div style={{ marginTop: '20px' }}>
        <Alert
          message="Redirecting..."
          description={`Taking you to the original URL for code: ${shortCode}`}
          type="info"
        />
      </div>
    </div>
  );
};

export default RedirectPage;    