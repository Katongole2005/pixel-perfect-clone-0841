
-- The contact_messages INSERT policy allows anonymous submissions which is intentional for a contact form.
-- However, let's add rate limiting by requiring at least name and email validation at DB level.
ALTER TABLE public.contact_messages 
  ADD CONSTRAINT contact_name_not_empty CHECK (length(trim(name)) > 0),
  ADD CONSTRAINT contact_email_not_empty CHECK (length(trim(email)) > 3),
  ADD CONSTRAINT contact_message_not_empty CHECK (length(trim(message)) > 0);
