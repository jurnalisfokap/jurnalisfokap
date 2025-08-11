/* Scroll-triggered animations */
.kegiatan-card {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.kegiatan-card.in-view {
    opacity: 1;
    transform: translateY(0);
}

/* Hover effects */
.btn {
    position: relative;
    overflow: hidden;
}

.btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.2);
    transition: 0.3s;
}

.btn:hover::after {
    left: 100%;
}
