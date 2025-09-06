package com.example.auth_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        // Public pages
//                        .requestMatchers("/", "/index", "/login", "/signup", "/ai-services").permitAll()
                        .requestMatchers("/", "/index", "/login", "/signup", "/ai-services", "/dashboard").permitAll()
                                // Static resources under / (all files in static)
                        .requestMatchers("/**").permitAll() // temporarily allow all static files

                        // Any other request needs authentication
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .defaultSuccessUrl("/dashboard", true)
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login?logout")
                        .permitAll()
                )
                .csrf(csrf -> csrf.disable());

        return http.build();
    }
//        @Bean
//        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//            http
//                    .authorizeHttpRequests(auth -> auth
//                            .requestMatchers("/", "/index", "/login", "/signup", "/ai-services").permitAll()
//                            //.requestMatchers("/css/**", "/js/**", "/images/**", "/webjars/**").permitAll()
//                            .requestMatchers("/**").permitAll() // temporarily allow all static files
//                            .anyRequest().authenticated()
//                    )
//                    .formLogin(form -> form
//                            .loginPage("/login")
//                            .defaultSuccessUrl("/dashboard", true)
//                            .permitAll()
//                    )
//                    .logout(logout -> logout
//                            .logoutUrl("/logout")
//                            .logoutSuccessUrl("/login?logout")
//                            .permitAll()
//                    )
//                    .csrf(csrf -> csrf.disable());
//
//            return http.build();
//        }

}
