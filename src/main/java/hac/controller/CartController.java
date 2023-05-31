package hac.controller;

import hac.Entity.Movie;
import hac.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // Endpoint for adding a movie to the cart
    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@RequestBody Movie movie) {

        // Add the movie to the cart
        cartService.addToCart(movie);
        return ResponseEntity.ok().build();
    }
    // Endpoint for retrieving the cart items
    @GetMapping
    public ResponseEntity<List<Movie>> getCartItems() {
        List<Movie> cartItems = cartService.getCartItems();
        return ResponseEntity.ok(cartItems);
    }
    // Endpoint for removing a movie from the cart
    @DeleteMapping("/{movieId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable String movieId) {
        cartService.removeFromCart(movieId);
        return ResponseEntity.ok().build();
    }
    // Endpoint for clearing the entire cart
    @DeleteMapping()
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok().build();
    }
}
