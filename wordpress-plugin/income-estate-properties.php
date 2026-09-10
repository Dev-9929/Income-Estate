<?php
/**
 * Plugin Name: Income Estate - Property Post Type & Custom Fields
 * Description: Registers the "property" custom post type, "property_category" taxonomy with default terms, and Secure Custom Fields (SCF / ACF) field groups (propertyDetails & propertyPage) with full WPGraphQL support for all editorial sections (Pricing, Virtual Tour Videos, Brochure, ROI Highlights, etc.).
 * Version:     1.2.0
 * Author:      Income Estate Architecture Team
 * License:     GPL-2.0-or-later
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * 1. Register Taxonomy ("property_category") & Custom Post Type ("property")
 */
function ie_register_property_schema() {

	/**
	 * Taxonomy: Property Category (property_category)
	 * Registered before CPT to ensure proper object association on initialization.
	 */
	$taxonomy_labels = array(
		'name'              => _x( 'Property Categories', 'taxonomy general name', 'income-estate' ),
		'singular_name'     => _x( 'Property Category', 'taxonomy singular name', 'income-estate' ),
		'search_items'      => __( 'Search Property Categories', 'income-estate' ),
		'all_items'         => __( 'All Property Categories', 'income-estate' ),
		'parent_item'       => __( 'Parent Property Category', 'income-estate' ),
		'parent_item_colon' => __( 'Parent Property Category:', 'income-estate' ),
		'edit_item'         => __( 'Edit Property Category', 'income-estate' ),
		'update_item'       => __( 'Update Property Category', 'income-estate' ),
		'add_new_item'      => __( 'Add New Property Category', 'income-estate' ),
		'new_item_name'     => __( 'New Property Category Name', 'income-estate' ),
		'menu_name'         => __( 'Categories', 'income-estate' ),
	);

	$taxonomy_args = array(
		'labels'              => $taxonomy_labels,
		'hierarchical'        => true,
		'public'              => true,
		'show_ui'             => true,
		'show_admin_column'   => true,
		'show_in_nav_menus'   => true,
		'show_tagcloud'       => false,
		'show_in_rest'        => true,
		'rewrite'             => array( 'slug' => 'property-category' ),
		// WPGraphQL Configuration
		'show_in_graphql'     => true,
		'graphql_single_name' => 'propertyCategory',
		'graphql_plural_name' => 'propertyCategories',
	);

	register_taxonomy( 'property_category', array( 'property' ), $taxonomy_args );

	/**
	 * Custom Post Type: Property (property)
	 */
	$cpt_labels = array(
		'name'               => _x( 'Properties', 'post type general name', 'income-estate' ),
		'singular_name'      => _x( 'Property', 'post type singular name', 'income-estate' ),
		'menu_name'          => _x( 'Properties', 'admin menu', 'income-estate' ),
		'name_admin_bar'     => _x( 'Property', 'add new on admin bar', 'income-estate' ),
		'add_new'            => _x( 'Add New', 'property', 'income-estate' ),
		'add_new_item'       => __( 'Add New Property', 'income-estate' ),
		'new_item'           => __( 'New Property', 'income-estate' ),
		'edit_item'          => __( 'Edit Property', 'income-estate' ),
		'view_item'          => __( 'View Property', 'income-estate' ),
		'all_items'          => __( 'All Properties', 'income-estate' ),
		'search_items'       => __( 'Search Properties', 'income-estate' ),
		'parent_item_colon'  => __( 'Parent Properties:', 'income-estate' ),
		'not_found'          => __( 'No properties found.', 'income-estate' ),
		'not_found_in_trash' => __( 'No properties found in Trash.', 'income-estate' ),
	);

	$cpt_args = array(
		'labels'              => $cpt_labels,
		'public'              => true,
		'publicly_queryable'  => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'query_var'           => true,
		'rewrite'             => array( 'slug' => 'properties' ),
		'capability_type'     => 'post',
		'has_archive'         => true,
		'hierarchical'        => false,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-building',
		'supports'            => array( 'title', 'editor', 'thumbnail' ),
		'taxonomies'          => array( 'property_category' ),
		'show_in_rest'        => true,
		// WPGraphQL Configuration
		'show_in_graphql'     => true,
		'graphql_single_name' => 'property',
		'graphql_plural_name' => 'properties',
	);

	register_post_type( 'property', $cpt_args );
}
add_action( 'init', 'ie_register_property_schema', 10 );

/**
 * 2. Pre-register Default Taxonomy Terms
 * Automatically seeds default terms for "property_category" on init if they do not exist.
 */
function ie_seed_default_property_categories() {
	$default_terms = array(
		'ROI Properties',
		'Branded Residences',
		'Other Properties',
	);

	foreach ( $default_terms as $term_name ) {
		if ( ! term_exists( $term_name, 'property_category' ) ) {
			wp_insert_term(
				$term_name,
				'property_category',
				array(
					'slug' => sanitize_title( $term_name ),
				)
			);
		}
	}
}
add_action( 'init', 'ie_seed_default_property_categories', 20 );

/**
 * 3. Register SCF (Secure Custom Fields / ACF) Field Group 1: "Property Details" (propertyDetails)
 */
function ie_register_property_scf_fields() {
	if ( function_exists( 'acf_add_local_field_group' ) ) {
		acf_add_local_field_group( array(
			'key'                   => 'group_property_details',
			'title'                 => 'Property Details',
			'fields'                => array(
				array(
					'key'                => 'field_property_location',
					'label'              => 'Location',
					'name'               => 'location',
					'type'               => 'text',
					'instructions'       => 'Enter property location (e.g. Downtown Dubai)',
					'required'           => 0,
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'location',
				),
				array(
					'key'                => 'field_property_price_display',
					'label'              => 'Price Display',
					'name'               => 'price_display',
					'type'               => 'text',
					'instructions'       => 'Enter price display text (e.g. Starting from $500,000)',
					'required'           => 0,
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'priceDisplay',
				),
				array(
					'key'                => 'field_property_total_units',
					'label'              => 'Total Units',
					'name'               => 'total_units',
					'type'               => 'text',
					'instructions'       => 'Enter total units count (e.g. 150 Units)',
					'required'           => 0,
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'totalUnits',
				),
				array(
					'key'                => 'field_property_annual_roi',
					'label'              => 'Annual ROI',
					'name'               => 'annual_roi',
					'type'               => 'text',
					'instructions'       => 'Enter expected annual ROI percentage (e.g. 8.5%)',
					'required'           => 0,
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'annualRoi',
				),
				array(
					'key'                => 'field_property_start_invest_link',
					'label'              => 'Start Invest Link',
					'name'               => 'start_invest_link',
					'type'               => 'url',
					'instructions'       => 'Enter direct target URL for investment action',
					'required'           => 0,
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'startInvestLink',
				),
				array(
					'key'                => 'field_property_gallery_images',
					'label'              => 'Gallery Images',
					'name'               => 'gallery_images',
					'type'               => 'gallery',
					'instructions'       => 'Upload image gallery for the property listing',
					'required'           => 0,
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'galleryImages',
				),
			),
			'location'              => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'property',
					),
				),
			),
			'menu_order'            => 0,
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen'        => '',
			'active'                => true,
			'description'           => 'Custom field details for property listings.',
			'show_in_graphql'       => 1,
			'graphql_field_name'    => 'propertyDetails',
		) );
	}
}
add_action( 'acf/init', 'ie_register_property_scf_fields' );

/**
 * 4. Register SCF Field Group 2: "Property Detail Page" (propertyPage)
 * Provides comprehensive data fields for single property detail pages with full dynamic sections.
 */
function ie_register_property_page_scf_fields() {
	if ( function_exists( 'acf_add_local_field_group' ) ) {
		acf_add_local_field_group( array(
			'key'                   => 'group_property_detail_page',
			'title'                 => 'Property Detail Page',
			'fields'                => array(

				// ==========================================
				// 1. HERO & KEY INVESTMENT SPECIFICATIONS
				// ==========================================
				array(
					'key'                => 'field_pd_title_accent',
					'label'              => 'Title Accent',
					'name'               => 'title_accent',
					'type'               => 'text',
					'instructions'       => 'Secondary accent title in gold/italic (e.g. "Arcadia" for Skyline Arcadia)',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'titleAccent',
				),
				array(
					'key'                => 'field_pd_hero_label',
					'label'              => 'Hero Label / Badge',
					'name'               => 'hero_label',
					'type'               => 'text',
					'instructions'       => 'Tagline on hero banner (e.g. "Premium Commercial Investment")',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'heroLabel',
				),
				array(
					'key'                => 'field_pd_hero_image',
					'label'              => 'Hero Background Image',
					'name'               => 'hero_image',
					'type'               => 'image',
					'return_format'      => 'array',
					'preview_size'       => 'medium',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'heroImage',
				),
				array(
					'key'                => 'field_pd_property_type',
					'label'              => 'Property Type',
					'name'               => 'property_type',
					'type'               => 'text',
					'instructions'       => 'e.g. "Commercial Office", "Luxury Resort Suite", "Retail Showroom"',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'propertyType',
				),
				array(
					'key'                => 'field_pd_possession',
					'label'              => 'Possession Status',
					'name'               => 'possession',
					'type'               => 'text',
					'instructions'       => 'e.g. "Ready to Buy", "Dec 2026", "Immediate"',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'possession',
				),
				array(
					'key'                => 'field_pd_project_scope',
					'label'              => 'Project Scope / Units',
					'name'               => 'project_scope',
					'type'               => 'text',
					'instructions'       => 'e.g. "8 Exclusive Units", "Phase 1 Open", "64 Suites"',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'projectScope',
				),
				array(
					'key'                => 'field_pd_size_area',
					'label'              => 'Total Land / Project Area',
					'name'               => 'size_area',
					'type'               => 'text',
					'instructions'       => 'e.g. "1100 SqYd (Bigha)", "45,000 Sq.Ft."',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'sizeArea',
				),
				array(
					'key'                => 'field_pd_price_starting',
					'label'              => 'Price Starting',
					'name'               => 'price_starting',
					'type'               => 'text',
					'instructions'       => 'Formatted price text (e.g. "From ₹ 70 LACS.")',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'priceStarting',
				),
				array(
					'key'                => 'field_pd_rental_yield',
					'label'              => 'Rental Yield',
					'name'               => 'rental_yield',
					'type'               => 'text',
					'instructions'       => 'e.g. "9.0%"',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'rentalYield',
				),
				array(
					'key'                => 'field_pd_target_irr',
					'label'              => 'Target IRR',
					'name'               => 'target_irr',
					'type'               => 'text',
					'instructions'       => 'e.g. "12.0%"',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'targetIrr',
				),

				// ==========================================
				// 2. EDITORIAL INTRO & BROCHURE DOWNLOAD
				// ==========================================
				array(
					'key'                => 'field_pd_brochure_file',
					'label'              => 'Brochure PDF Document',
					'name'               => 'brochure_file',
					'type'               => 'file',
					'return_format'      => 'array',
					'instructions'       => 'Upload property brochure PDF for the "DOWNLOAD BROCHURE" button',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'brochureFile',
				),
				array(
					'key'                => 'field_pd_brochure_url',
					'label'              => 'External Brochure URL (Optional Fallback)',
					'name'               => 'brochure_url',
					'type'               => 'url',
					'instructions'       => 'Direct link if hosting PDF externally (e.g. Google Drive, S3)',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'brochureUrl',
				),
				array(
					'key'                => 'field_pd_overview_tag',
					'label'              => 'Overview Sub-Tag',
					'name'               => 'overview_tag',
					'type'               => 'text',
					'instructions'       => 'e.g. "Project Overview"',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'overviewTag',
				),
				array(
					'key'                => 'field_pd_overview_heading',
					'label'              => 'Overview Heading Main',
					'name'               => 'overview_heading',
					'type'               => 'text',
					'instructions'       => 'e.g. "A Commercial Landmark"',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'overviewHeading',
				),
				array(
					'key'                => 'field_pd_overview_heading_accent',
					'label'              => 'Overview Heading Accent',
					'name'               => 'overview_heading_accent',
					'type'               => 'text',
					'instructions'       => 'Italicized accent line (e.g. "Built for Investors")',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'overviewHeadingAccent',
				),
				array(
					'key'                => 'field_pd_overview_text1',
					'label'              => 'Overview Paragraph 1',
					'name'               => 'overview_text1',
					'type'               => 'textarea',
					'rows'               => 4,
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'overviewText1',
				),
				array(
					'key'                => 'field_pd_overview_text2',
					'label'              => 'Overview Paragraph 2',
					'name'               => 'overview_text2',
					'type'               => 'textarea',
					'rows'               => 4,
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'overviewText2',
				),
				array(
					'key'                => 'field_pd_main_image',
					'label'              => 'Overview Main Image',
					'name'               => 'main_image',
					'type'               => 'image',
					'return_format'      => 'array',
					'preview_size'       => 'medium',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'mainImage',
				),
				array(
					'key'                => 'field_pd_thumb_image',
					'label'              => 'Overview Thumbnail Image',
					'name'               => 'thumb_image',
					'type'               => 'image',
					'return_format'      => 'array',
					'preview_size'       => 'thumbnail',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'thumbImage',
				),

				// ==========================================
				// 3. READ FULL STORY MODAL CONTENT
				// ==========================================
				array(
					'key'                => 'field_pd_overview_full_story',
					'label'              => 'Overview Full Story (Modal Paragraphs)',
					'name'               => 'overview_full_story',
					'type'               => 'repeater',
					'layout'             => 'row',
					'button_label'       => 'Add Story Paragraph',
					'instructions'       => 'Multi-paragraph in-depth narrative opened when clicking "READ FULL STORY"',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'overviewFullStory',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_story_para',
							'label'              => 'Paragraph',
							'name'               => 'paragraph',
							'type'               => 'textarea',
							'rows'               => 3,
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'paragraph',
						),
					),
				),
				array(
					'key'                => 'field_pd_overview_highlights',
					'label'              => 'Overview Key Takeaways (Modal Bullets)',
					'name'               => 'overview_highlights',
					'type'               => 'repeater',
					'layout'             => 'table',
					'button_label'       => 'Add Takeaway Bullet',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'overviewHighlights',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_overview_hl_text',
							'label'              => 'Bullet Point',
							'name'               => 'highlight',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'highlight',
						),
					),
				),

				// ==========================================
				// 4. FACTS STRIP
				// ==========================================
				array(
					'key'                => 'field_pd_facts',
					'label'              => 'Facts Strip',
					'name'               => 'facts',
					'type'               => 'repeater',
					'layout'             => 'table',
					'button_label'       => 'Add Fact',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'facts',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_facts_val',
							'label'              => 'Value',
							'name'               => 'val',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'val',
						),
						array(
							'key'                => 'field_pd_facts_lbl',
							'label'              => 'Label',
							'name'               => 'lbl',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'lbl',
						),
					),
				),

				// ==========================================
				// 5. BENTO VISUAL GALLERY
				// ==========================================
				array(
					'key'                => 'field_pd_gallery',
					'label'              => 'Bento Visual Gallery',
					'name'               => 'gallery',
					'type'               => 'repeater',
					'layout'             => 'block',
					'button_label'       => 'Add Gallery Item',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'gallery',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_gallery_image',
							'label'              => 'Image',
							'name'               => 'image',
							'type'               => 'image',
							'return_format'      => 'array',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'image',
						),
						array(
							'key'                => 'field_pd_gallery_label',
							'label'              => 'Label / Caption',
							'name'               => 'label',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'label',
						),
						array(
							'key'                => 'field_pd_gallery_grid_class',
							'label'              => 'Grid Layout Slot',
							'name'               => 'grid_class',
							'type'               => 'select',
							'choices'            => array(
								'pd2-gi-1' => 'Slot 1 (Large Main / Full Width)',
								'pd2-gi-2' => 'Slot 2 (Top Right)',
								'pd2-gi-3' => 'Slot 3 (Mid Right)',
								'pd2-gi-4' => 'Slot 4 (Bottom Left)',
								'pd2-gi-5' => 'Slot 5 (Bottom Mid)',
								'pd2-gi-6' => 'Slot 6 (Bottom Right)',
							),
							'default_value'      => 'pd2-gi-1',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'gridClass',
						),
					),
				),

				// ==========================================
				// 6. SPACE & PRICING CONFIGURATIONS
				// ==========================================
				array(
					'key'                => 'field_pd_unit_configurations',
					'label'              => 'Space & Pricing Configurations',
					'name'               => 'unit_configurations',
					'type'               => 'repeater',
					'layout'             => 'table',
					'button_label'       => 'Add Unit Configuration',
					'instructions'       => 'Inventory units displayed in the Space & Pricing table',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'unitConfigurations',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_unit_type',
							'label'              => 'Unit Type',
							'name'               => 'type',
							'type'               => 'text',
							'instructions'       => 'e.g. Studio Suite, 1 BHK Executive, Retail Showroom',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'type',
						),
						array(
							'key'                => 'field_pd_unit_size',
							'label'              => 'Size / Area',
							'name'               => 'size',
							'type'               => 'text',
							'instructions'       => 'e.g. 450 - 620 Sq.Ft., 1,250 Sq.Ft.',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'size',
						),
						array(
							'key'                => 'field_pd_unit_price',
							'label'              => 'Price Starting',
							'name'               => 'price',
							'type'               => 'text',
							'instructions'       => 'e.g. ₹ 70 Lakhs, ₹ 1.45 Cr',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'price',
						),
						array(
							'key'                => 'field_pd_unit_payment_plan',
							'label'              => 'Payment Plan Option',
							'name'               => 'payment_plan',
							'type'               => 'text',
							'instructions'       => 'e.g. 40:60 SLB Plan, Construction Linked',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'paymentPlan',
						),
					),
				),

				// ==========================================
				// 7. VIRTUAL TOUR & ROUTE VIDEOS (VIDEO SHOWCASE)
				// ==========================================
				array(
					'key'                => 'field_pd_videos',
					'label'              => 'Virtual Tour & Route Videos',
					'name'               => 'videos',
					'type'               => 'repeater',
					'layout'             => 'block',
					'button_label'       => 'Add Video Tour Item',
					'instructions'       => 'Interactive video player & playlist items for the Route Experience and Virtual Tour section',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'videos',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_vid_id',
							'label'              => 'Video ID / Slug',
							'name'               => 'id',
							'type'               => 'text',
							'instructions'       => 'e.g. video-route-1, video-drone-1',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'id',
						),
						array(
							'key'                => 'field_pd_vid_title',
							'label'              => 'Video Title',
							'name'               => 'title',
							'type'               => 'text',
							'instructions'       => 'e.g. Airport to Property Scenic Route',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'title',
						),
						array(
							'key'                => 'field_pd_vid_category',
							'label'              => 'Category Type',
							'name'               => 'category',
							'type'               => 'select',
							'choices'            => array(
								'route'        => 'Route Experience (Road / Connectivity)',
								'drone'        => 'Drone Flythrough (Aerial 360)',
								'walkthrough'  => 'Virtual Interior Tour (Walkthrough)',
								'construction' => 'Site Construction Update',
							),
							'default_value'      => 'route',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'category',
						),
						array(
							'key'                => 'field_pd_vid_cat_label',
							'label'              => 'Badge Label',
							'name'               => 'category_label',
							'type'               => 'text',
							'instructions'       => 'e.g. 4K Route Drive, Aerial 360, Interior Walkthrough',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'categoryLabel',
						),
						array(
							'key'                => 'field_pd_vid_duration',
							'label'              => 'Duration',
							'name'               => 'duration',
							'type'               => 'text',
							'instructions'       => 'e.g. 3:45, 5:20',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'duration',
						),
						array(
							'key'                => 'field_pd_vid_poster',
							'label'              => 'Poster Thumbnail Image',
							'name'               => 'poster_image',
							'type'               => 'image',
							'return_format'      => 'array',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'posterImage',
						),
						array(
							'key'                => 'field_pd_vid_url',
							'label'              => 'Video File URL (MP4 / WebM)',
							'name'               => 'video_url',
							'type'               => 'text',
							'instructions'       => 'Direct video URL (e.g. https://domain.com/videos/route.mp4) or hosted asset URL',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'videoUrl',
						),
						array(
							'key'                => 'field_pd_vid_desc',
							'label'              => 'Description',
							'name'               => 'description',
							'type'               => 'textarea',
							'rows'               => 3,
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'description',
						),
						array(
							'key'                => 'field_pd_vid_waypoints',
							'label'              => 'Route Waypoints / Milestones',
							'name'               => 'waypoints',
							'type'               => 'repeater',
							'layout'             => 'table',
							'button_label'       => 'Add Waypoint',
							'instructions'       => 'Key locations or timestamps covered in this video',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'waypoints',
							'sub_fields'         => array(
								array(
									'key'                => 'field_pd_wp_marker',
									'label'              => 'Time / Marker',
									'name'               => 'marker',
									'type'               => 'text',
									'instructions'       => 'e.g. 00:30, 01:45',
									'show_in_graphql'    => 1,
									'graphql_field_name' => 'marker',
								),
								array(
									'key'                => 'field_pd_wp_title',
									'label'              => 'Location / Landmark',
									'name'               => 'title',
									'type'               => 'text',
									'instructions'       => 'e.g. NH-48 Expressway Exit',
									'show_in_graphql'    => 1,
									'graphql_field_name' => 'title',
								),
								array(
									'key'                => 'field_pd_wp_desc',
									'label'              => 'Description',
									'name'               => 'desc',
									'type'               => 'text',
									'instructions'       => 'e.g. Smooth signal-free 6-lane connectivity',
									'show_in_graphql'    => 1,
									'graphql_field_name' => 'desc',
								),
							),
						),
					),
				),

				// ==========================================
				// 8. ROI DEEP DIVE & PROJECT HIGHLIGHTS
				// ==========================================
				array(
					'key'                => 'field_pd_highlights_intro',
					'label'              => 'Highlights Section Intro Text',
					'name'               => 'highlights_intro',
					'type'               => 'text',
					'instructions'       => 'Subtitle text above highlights (e.g. Institutional grade commercial development engineered for long-term lease yield.)',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'highlightsIntro',
				),
				array(
					'key'                => 'field_pd_project_highlights',
					'label'              => 'Project Highlights List',
					'name'               => 'project_highlights',
					'type'               => 'repeater',
					'layout'             => 'table',
					'button_label'       => 'Add Project Highlight',
					'instructions'       => 'Checklist of core investment advantages shown in the ROI section',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'projectHighlights',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_ph_text',
							'label'              => 'Highlight Point',
							'name'               => 'highlight',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'highlight',
						),
					),
				),
				array(
					'key'                => 'field_pd_roi_metrics',
					'label'              => 'ROI Metrics Grid',
					'name'               => 'roi_metrics',
					'type'               => 'repeater',
					'layout'             => 'table',
					'button_label'       => 'Add Metric',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'roiMetrics',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_roi_metrics_label',
							'label'              => 'Label',
							'name'               => 'label',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'label',
						),
						array(
							'key'                => 'field_pd_roi_metrics_val',
							'label'              => 'Value',
							'name'               => 'val',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'val',
						),
						array(
							'key'                => 'field_pd_roi_metrics_is_gold',
							'label'              => 'Gold Highlight Accent',
							'name'               => 'is_gold',
							'type'               => 'true_false',
							'ui'                 => 1,
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'isGold',
						),
					),
				),
				array(
					'key'                => 'field_pd_roi_front_image',
					'label'              => 'ROI Section Front Stack Image',
					'name'               => 'roi_front_image',
					'type'               => 'image',
					'return_format'      => 'array',
					'preview_size'       => 'medium',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'roiFrontImage',
				),
				array(
					'key'                => 'field_pd_roi_back_image',
					'label'              => 'ROI Section Back Stack Image',
					'name'               => 'roi_back_image',
					'type'               => 'image',
					'return_format'      => 'array',
					'preview_size'       => 'medium',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'roiBackImage',
				),

				// ==========================================
				// 9. TENANTS & OPERATORS
				// ==========================================
				array(
					'key'                => 'field_pd_tenants',
					'label'              => 'Tenants & Operators',
					'name'               => 'tenants',
					'type'               => 'repeater',
					'layout'             => 'table',
					'button_label'       => 'Add Tenant',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'tenants',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_tenants_name',
							'label'              => 'Tenant Name',
							'name'               => 'name',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'name',
						),
						array(
							'key'                => 'field_pd_tenants_detail',
							'label'              => 'Lease Detail',
							'name'               => 'detail',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'detail',
						),
					),
				),

				// ==========================================
				// 10. AMENITIES
				// ==========================================
				array(
					'key'                => 'field_pd_amenities',
					'label'              => 'Property Amenities',
					'name'               => 'amenities',
					'type'               => 'repeater',
					'layout'             => 'table',
					'button_label'       => 'Add Amenity',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'amenities',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_amenities_name',
							'label'              => 'Amenity Name',
							'name'               => 'name',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'name',
						),
						array(
							'key'                => 'field_pd_amenities_icon_type',
							'label'              => 'Icon Type',
							'name'               => 'icon_type',
							'type'               => 'select',
							'choices'            => array(
								'lease'    => 'Lease Guarantee',
								'parking'  => 'Basement Parking',
								'security' => '24/7 Security',
								'view'     => 'Panoramic View',
								'interior' => 'Hotel Interior',
								'managed'  => 'Managed Operations',
								'pool'     => 'Swimming Pool',
								'spa'      => 'Spa & Wellness',
							),
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'iconType',
						),
					),
				),

				// ==========================================
				// 11. LOCATION & CONNECTIVITY
				// ==========================================
				array(
					'key'                => 'field_pd_location_desc',
					'label'              => 'Location Micro-Market Description',
					'name'               => 'location_desc',
					'type'               => 'textarea',
					'rows'               => 3,
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'locationDesc',
				),
				array(
					'key'                => 'field_pd_map_embed_url',
					'label'              => 'Google Maps Embed URL',
					'name'               => 'map_embed_url',
					'type'               => 'url',
					'instructions'       => 'Paste the https://www.google.com/maps/embed?... URL',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'mapEmbedUrl',
				),
				array(
					'key'                => 'field_pd_nearby',
					'label'              => 'Nearby Transit & Connectivity',
					'name'               => 'nearby',
					'type'               => 'repeater',
					'layout'             => 'table',
					'button_label'       => 'Add Location',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'nearby',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_nearby_name',
							'label'              => 'Location Name',
							'name'               => 'name',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'name',
						),
						array(
							'key'                => 'field_pd_nearby_dist',
							'label'              => 'Distance / Duration',
							'name'               => 'dist',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'dist',
						),
					),
				),

				// ==========================================
				// 12. STRUCTURED PAYMENT PLAN
				// ==========================================
				array(
					'key'                => 'field_pd_payment_plan',
					'label'              => 'Structured Payment Plan',
					'name'               => 'payment_plan',
					'type'               => 'repeater',
					'layout'             => 'table',
					'button_label'       => 'Add Milestone',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'paymentPlan',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_payment_plan_milestone',
							'label'              => 'Milestone',
							'name'               => 'milestone',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'milestone',
						),
						array(
							'key'                => 'field_pd_payment_plan_timeline',
							'label'              => 'Timeline',
							'name'               => 'timeline',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'timeline',
						),
						array(
							'key'                => 'field_pd_payment_plan_percent',
							'label'              => 'Percentage (%)',
							'name'               => 'percent',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'percent',
						),
						array(
							'key'                => 'field_pd_payment_plan_is_highlight',
							'label'              => 'Highlight Milestone',
							'name'               => 'is_highlight',
							'type'               => 'true_false',
							'ui'                 => 1,
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'isHighlight',
						),
					),
				),

				// ==========================================
				// 13. LIVE CONSTRUCTION PROGRESS
				// ==========================================
				array(
					'key'                => 'field_pd_construction_stages',
					'label'              => 'Live Construction Progress',
					'name'               => 'construction_stages',
					'type'               => 'repeater',
					'layout'             => 'block',
					'button_label'       => 'Add Stage',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'constructionStages',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_construction_stages_image',
							'label'              => 'Stage Photo',
							'name'               => 'image',
							'type'               => 'image',
							'return_format'      => 'array',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'image',
						),
						array(
							'key'                => 'field_pd_construction_stages_overlay',
							'label'              => 'Overlay Label / Date',
							'name'               => 'overlay',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'overlay',
						),
					),
				),

				// ==========================================
				// 14. PROPERTY FAQS
				// ==========================================
				array(
					'key'                => 'field_pd_faqs',
					'label'              => 'Property FAQs',
					'name'               => 'faqs',
					'type'               => 'repeater',
					'layout'             => 'row',
					'button_label'       => 'Add FAQ',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'faqs',
					'sub_fields'         => array(
						array(
							'key'                => 'field_pd_faqs_question',
							'label'              => 'Question',
							'name'               => 'question',
							'type'               => 'text',
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'question',
						),
						array(
							'key'                => 'field_pd_faqs_answer',
							'label'              => 'Answer',
							'name'               => 'answer',
							'type'               => 'textarea',
							'rows'               => 3,
							'show_in_graphql'    => 1,
							'graphql_field_name' => 'answer',
						),
					),
				),

				// ==========================================
				// 15. SIMILAR / RELATED PROPERTIES
				// ==========================================
				array(
					'key'                => 'field_pd_similar_properties',
					'label'              => 'Similar / Related Properties',
					'name'               => 'similar_properties',
					'type'               => 'relationship',
					'post_type'          => array( 'property' ),
					'max'                => 3,
					'filters'            => array( 'search' ),
					'return_format'      => 'object',
					'show_in_graphql'    => 1,
					'graphql_field_name' => 'similarProperties',
				),

			),
			'location'              => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'property',
					),
				),
			),
			'menu_order'            => 1,
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen'        => '',
			'active'                => true,
			'description'           => 'Full property detail page data for single property pages.',
			'show_in_graphql'       => 1,
			'graphql_field_name'    => 'propertyPage',
		) );
	}
}
add_action( 'acf/init', 'ie_register_property_page_scf_fields' );
