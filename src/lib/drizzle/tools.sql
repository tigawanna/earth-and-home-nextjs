SELECT format(
        'postgresql://%s:%s@%s:%s/%s', current_user, 'postgres123', -- Replace or omit if not needed
        inet_server_addr (), inet_server_port (), current_database ()
    ) AS connection_string;
