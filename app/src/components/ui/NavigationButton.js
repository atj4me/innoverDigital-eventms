import { Button, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight, FaCalendarPlus } from 'react-icons/fa';

export const NavigationButton = ({ buttonType, path, buttonText, showIcon, colorScheme, loading }) => {
    const navigate = useNavigate();

    return (
        <Button
            type={buttonType}
            bg="white"
            borderWidth={2}
            borderColor={`${colorScheme}.700`}
            color={`${colorScheme}.700`}
            onClick={() => navigate(path)}
            _hover={{ bg: `${colorScheme}.700`, color: "white" }}
            disabled={loading}
            aria-label={`Navigate to ${buttonText}`} // Accessibility improvement
        >
            
            {loading === true && <Spinner/>}
            {loading === false && <>
            {showIcon==="left" && <FaArrowLeft/>}
            {showIcon === 'calendarLeft' && <FaCalendarPlus />}{' '}
            {buttonText}{' '}
            {showIcon==="right" && <FaArrowRight/>}
            </>}
        </Button>
    );
};

// Default props
NavigationButton.defaultProps = {
    path: "",
    buttonText: "View Details",
    showIcon: "",
    colorScheme: "gray",
    buttonType: "button",
    loading: false
};

// Prop types
NavigationButton.propTypes = {
    path: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    showIcon: PropTypes.string,
    colorScheme: PropTypes.string,
    buttonType: PropTypes.string,
    loading: PropTypes.bool,
};

