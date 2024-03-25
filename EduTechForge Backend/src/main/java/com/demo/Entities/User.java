package com.demo.Entities;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
public class User extends BaseEntity {

	@Column
	private String firstname;
    @Column
	private String lastname;
    @Column(unique = true)
	private String email;
	@Column
	private String password;
	@Column
	private String mobileNumber;
//	@Column
//	private String city;
//	@Column
//	private String country;
	@Column
	private String image;
	@Column
	private String education;
	@Column
	private String profile;
	@Column
	private int experience;
	@Column
	private String experience_field;
	@Column
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Course_cards> posts;

//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//	private Set<Comment> comments;
//
//	
@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<UserRole> role;
}
