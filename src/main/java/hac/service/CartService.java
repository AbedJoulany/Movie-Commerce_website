package hac.service;

import hac.Entity.Movie;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    private final HttpSession session;

    public CartService(HttpSession session) {
        this.session = session;
    }
    // Add a movie to the cart
    public void addToCart(Movie movie) {
        // Retrieve the cart from session
        List<Movie> cart = getCartFromSession();

        // Add the movie to the cart
        if (!isMovieInCart(movie)) {
            cart.add(movie);
        }

        // Update the cart in the session
        updateCartInSession(cart);
    }
    // Retrieve the cart items
    public List<Movie> getCartItems() {
        // Retrieve the cart from session
        return getCartFromSession();
    }
    // Remove a movie from the cart
    public void removeFromCart(String movieId) {
        // Retrieve the cart from session
        List<Movie> cart = getCartFromSession();

        // Remove the movie from the cart
        cart.removeIf(movie -> movie.getId().equals(Long.valueOf(movieId)));

        // Update the cart in the session
        updateCartInSession(cart);
    }
    // Clear the entire cart
    public void clearCart() {
        // Retrieve the cart from session
        List<Movie> cart = getCartFromSession();

        // clear cart
        cart.clear();

        // Update the cart in the session
        updateCartInSession(cart);
    }
    // Retrieve the cart from the session
    private List<Movie> getCartFromSession() {
        List<Movie> cart = (List<Movie>) session.getAttribute("cart");
        if (cart == null) {
            cart = new ArrayList<>();
            session.setAttribute("cart", cart);
        }
        return cart;
    }
    // Check if a movie is already present in the cart
    public boolean isMovieInCart(Movie movie) {
        List<Movie> cart = getCartFromSession();
        for (Movie cartItem : cart) {
            if (cartItem.getId().equals(movie.getId())) {
                // Movie already exists in the cart
                return true;
            }
        }
        // Movie not found in the cart
        return false;
    }
    // Update the cart in the session
    private void updateCartInSession(List<Movie> cart) {
        session.setAttribute("cart", cart);
    }

}
